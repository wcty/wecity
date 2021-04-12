import React, { useState, useEffect, useMemo, useRef } from 'react'
import {ReactComponent as ActiveMarker} from 'assets/images/markerActive.svg'
import { makeStyles } from '@material-ui/core/styles'
import { Paper, Typography, Box, Button, Card, CardActions, CardContent, CardActionArea, useTheme } from '@material-ui/core'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useHistory } from 'react-router-dom'
import { Helmet } from "react-helmet"
import WecityGroups from 'assets/images/wecity_groups_512.png'
import { mapboxConfig, atoms, useI18n } from 'misc'
import ArrowNavigation from  './ArrowNavigation'

const useStyles = makeStyles((theme) => ({
  paper:{
    minHeight: "290px",
    minWidth: "100%",
    zIndex: 10,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
  },
  info: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  }
}));

export default ({ mapRef })=>{
  const [next] = useRecoilState(atoms.nextAtom)
  // const [index] = useRecoilState(atoms.indexAtom)
  const [location] = useRecoilState(atoms.locationAtom)
  const [feed] = useRecoilState(atoms.initiativeFeed)
  const classes = useStyles();
  const i18n = useI18n()
  const theme = useTheme()
  const distance = useMemo(()=>next?.features[0]?.properties?.distance?.toFixed(0), [next])
  const history = useHistory()
  const [addressString, setAddress] = useState()
  const [slideIndex, setSlideIndex] = useRecoilState(atoms.indexAtom)
  const lang = useRecoilValue(atoms.lang)

  useEffect(()=>{
    if(next?.features[0]){
      const coords = next?.features[0]?.geometry.coordinates
      const request = async ()=>{
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=${mapboxConfig.accessToken}&language=${lang}`)
        const address = await response.json()
        setAddress(address.features[0]?.properties.address?
          (address.features[0]?.properties.address+', '+(address.features[1]?address.features[1].text:'')+', '+(address.features[3]?address.features[3].text:'')):
          (address.features[1]?address.features[1].text:'')+', '+(address.features[3]?address.features[3].text:''))
      }
      request()
    }
  }, [next.features[0], setAddress, lang])

  const onStart = ()=>{setSlideIndex(i=>i+1)}
  
  return <div style={{ position:"absolute", padding: '1rem', overflow: 'visible', bottom: 0, width: 'calc( 100% - 2rem )' }}>
  <Paper 
      className={classes.paper} 
      style={{
        cursor: 'pointer', 
        borderRadius: "5px",
        overflowY: 'visible',
        minHeight: '250px',
        maxHeight: '400px',
        width: '100%',
        bottom: "1rem",
        right: "1rem",
        // position: "absolute",
        minWidth: "calc( 100% - 2rem )"
      }}
    >   
      <ArrowNavigation/>
      <div id="wrapper">
        <Helmet>
          <title>{"We.city: explore initiatives" }</title>
          <meta property="og:title" content={i18n('exploreHelmetTitle')} />
          <meta property="og:site_name" content="We.city" />
          <meta property="og:description" content={i18n('exploreHelmetDescription')} />
          <meta property="og:url" content={"https://weee.city/initiative/explore"} />
          <meta property="og:image" content={WecityGroups} />
        </Helmet>

        {next.features.length>0 ? <Box className={classes.info} 
          style={{position:'relative', textAlign:'center'}}
        >
          <Typography variant="h6">
            { location ? i18n('exploreYouAreHere') : i18n('exploreHereItStarts') }
          </Typography>
          <Typography variant="body1">
            { location ? 
              next?.features[0]?.properties?.distance && 
                i18n('exploreNearestInitiativeDistance', distance<1000?distance:(distance/1000).toFixed(0), distance<1000)  
                :
              next?.features[0]?.properties?.distance && 
                i18n('exporeTurnOnLocationService') + `
                `+
                i18n('exploreNearestToMaidan', distance<1000?distance:(distance/1000).toFixed(0), distance<1000)
            }
          </Typography>
          <Card variant="outlined" style={{width:'100%'}}>
            <CardActionArea onClick={onStart} style={{background: theme.palette.primary.light}}>
              <CardContent>
                <ActiveMarker style={{margin:'0 auto'}} />
                <Typography variant="body1">
                  {addressString}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea onClick={onStart} style={{background: theme.palette.primary.main, color: theme.palette.primary.light}}>
              <CardActions>
                  <Typography variant="button" style={{margin:'0 auto'}}>
                    {i18n('exploreShowInitiative')}
                  </Typography>
              </CardActions>
            </CardActionArea>
          </Card>
            {i18n('exploreOr')}
          <Button onClick={()=>history.push('/create-initiative')} variant="outlined" style={{width:'100%', marginTop:'0.2rem'}}>
            {i18n('exploreProposeNew')}
          </Button>
        </Box> :        
        <Box className={classes.info} 
          style={{position:'relative', textAlign:'center'}}
        >
          <Typography variant="h6">
            {i18n('exploreAddInitiative')}
          </Typography>
          <Typography variant="body1">
            {i18n('exploreWatchedAllAddNew')}
          </Typography>
          <Card variant="outlined" style={{width:'100%'}}>
            <CardActionArea onClick={()=>history.push('/create-initiative')} style={{background: theme.palette.primary.light}}>
              <CardContent>
                <ActiveMarker style={{margin:'0 auto'}} />
                <Typography variant="body1">
                  {i18n('exploreProposeNewInitiative')}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Box>}
      </div>
  </Paper>
  </div>
}
