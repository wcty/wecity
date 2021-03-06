import React, { useState, useEffect, useMemo, Suspense } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Collapse, Paper, Typography, IconButton, Box,Fab, List, ListItem, ListItemText, Button, TextField, Card, CardActions, CardContent, CardActionArea, useTheme } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useRecoilState, useRecoilValue } from 'recoil'
import { useStorage, useUser } from 'reactfire'
import { People, LocationOn, ExpandLess, Close, ArrowBack, ArrowForward } from '@material-ui/icons'
import { useI18n, useWindowDimensions } from 'global/Hooks'
import { useParams, useHistory } from 'react-router-dom'
import { Helmet } from "react-helmet"
import { useQuery, useMutation } from '@apollo/client'
import { getInitiative, updateInitiativeMember, deleteInitiative } from 'global/Queries'
import ImageViewer from 'react-simple-image-viewer'
import InitiativeContent from './InitiativeContent/'
import * as Atoms from 'global/Atoms'
import addImage from 'assets/images/addImage.png'
import distance from '@turf/distance'
import translate from '@turf/transform-translate'
import WecityGroups from 'assets/images/wecity_groups_512.png'
import { mapboxConfig } from 'config/index'
import {ReactComponent as ActiveMarker} from 'assets/images/markerActive.svg'

const useStyles = makeStyles((theme) => ({
  paper:{
    // height: "100%",
    minHeight: "250px",
    // width: "100%",
    overflowX: "hidden",
    // flexGrow: 1,
    zIndex: 10,
    position: 'fixed',
    transitionDuration: '0.3s',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
  },
  img: {
    height: '160px',
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    margin: "auto",
    verticalAlign: 'middle',
    objectFit: 'cover'
  },
  info: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  alert: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    zIndex: 999,
    maxWidth: 'calc( 100% - 4rem )'
  }
}));

const ArrowNavigation = ({ setSP })=>{

  return <>
    <Fab size='small' 
      onClick={()=>{setSP(prev=>prev>0?prev-1:0)}} 
      style={{position: "fixed", transform: "translate( calc( 50% - 1rem ), -50% )", zIndex: 15}}
    >
      <ArrowBack/>
    </Fab>
    <Fab size='small' 
      onClick={()=>{setSP(prev=>prev+1)}} 
      style={{position: "fixed", right:0, transform: "translate( -50%, -50% )", zIndex: 15}}
    >
      <ArrowForward/>
    </Fab>
  </>
}

const Explore = ({ mapRef })=>{
  const classes = useStyles();
  const [sp, setSP] = useRecoilState(Atoms.swipePosition)
  const [location] = useRecoilState(Atoms.locationAtom)
  const [markers, setMarkers] = useRecoilState(Atoms.markersAtom)
  const i18n = useI18n()
  const theme = useTheme()
  const distance = useMemo(()=>markers?.features[0]?.properties?.distance?.toFixed(0), [markers])
  const history = useHistory()
  const [addressString, setAddress] = useState()

  useEffect(()=>{
    if(markers?.features[0]){
      const coords = markers?.features[0]?.geometry.coordinates
      const request = async ()=>{
        const response = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${coords[0]},${coords[1]}.json?access_token=${mapboxConfig.accessToken}`)
        const address = await response.json()
        setAddress(address.features[0]?.properties.address?
          (address.features[0]?.properties.address+', '+(address.features[1]?address.features[1].text:'')+', '+(address.features[3]?address.features[3].text:'')):
          (address.features[1]?address.features[1].text:'')+', '+(address.features[3]?address.features[3].text:''))
      }
      request()
      console.log('request', addressString)
    }
  }, [markers.features[0], setAddress])

  useEffect(()=>{
    if(location){
      console.log(location)
      const map = mapRef.current.getMap()
      const center = [location.longitude, location.latitude]
      map.flyTo({ center, offset: [0, -125], zoom: 16 })
    }
  }, [ mapRef, location ])

  return <Paper 
      className={classes.paper} 
      style={{
        cursor: 'pointer', 
        borderRadius: "5px",
        overflowY: 'visible',
        minHeight: '250px',
        maxHeight: '400px',
        width: 'calc( 100% - 2rem )',
        bottom: "1rem",
        right: "1rem",
      }}
    >   
      <ArrowNavigation setSP={setSP} />
      <div id="wrapper">
        <Helmet>
          <title>{"We.city: explore initiatives" }</title>
          <meta property="og:title" content="Explore initiatives" />
          <meta property="og:site_name" content="We.city" />
          <meta property="og:description" content="Platform for urban networking around common cases" />
          <meta property="og:url" content={"https://weee.city/initiative/explore"} />
          <meta property="og:image" content={WecityGroups} />
        </Helmet>

        {/* Actual Initiative */}
        <Box className={classes.info} 
          style={{position:'relative', textAlign:'center'}}
          onClick={()=>{
            console.log('clicked on card')
            //setExpanded(!expanded)
          }}
        >
          <Typography variant="h6">
            { location ? <>Ви знаходитесь тут</> : <>Звідси все почнется</> }
          </Typography>
          <Typography variant="body1">
            { location ? <>
              { markers?.features[0]?.properties?.distance && <> 
                Найближча від вас ініціатива в {distance<1000?distance+' m':(distance/1000).toFixed(0)+' km'}</> }
              </> : <>
              { markers?.features[0]?.properties?.distance && <> 
                Будь ласка, увімкніть геолокацію щоб скористуватися всіма функціями.
                Найближча від Майдану Незалежності ініціатива в {distance<1000?distance+' m':(distance/1000).toFixed(0)+' km'}.
               </> }
            </> }
          </Typography>
          <Card variant="outlined" style={{width:'100%'}}>
            
            <CardActionArea onClick={()=>console.log('clicked watch')} style={{background: theme.palette.primary.light}}>
              <CardContent>
                <ActiveMarker style={{margin:'0 auto'}} />
                <Typography variant="body1">
                  {addressString}
                </Typography>
              </CardContent>
            </CardActionArea>
            <CardActionArea onClick={()=>console.log('clicked watch')} style={{background: theme.palette.primary.main, color: theme.palette.primary.light}}>
              <CardActions>
                  <Typography variant="button" style={{margin:'0 auto'}}>
                    Переглянути ініціативу
                  </Typography>
              </CardActions>
            </CardActionArea>
          </Card>
            або
          <Button variant="outlined" style={{width:'100%', marginTop:'0.2rem'}}>
            Запропонувати нову
          </Button>

        </Box>
      </div>
  </Paper>
}

const Initiative = ({ mapRef, loaded })=>{
  const classes = useStyles();
  let { initiativeID, postID } = useParams();
  const vars = {variables: {UID: initiativeID}}
  const { loading, error, data, refetch } = useQuery(getInitiative, vars);
  const initiative = useMemo(()=>data?.initiative, [data])
  if (loading) console.log('loading');
  if (error) console.log('error', error);

  const [location] = useRecoilState(Atoms.locationAtom)
  const [expanded, setExpanded] = useRecoilState(Atoms.expanded)
  const mapDimensions = useWindowDimensions()
  const user = useUser()
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [markers, setMarkers] = useRecoilState(Atoms.markersAtom)
  const i18n = useI18n()
  const [alert, setAlert] = useState(null)
  const [sp, setSP] = useRecoilState(Atoms.swipePosition)
  const history = useHistory()

  useEffect(()=>{
    if( user && !user.isAnonymous && markers.features.length>0 && sp!==0){
      console.log('here', user, !user?.isAnonymous)
      if(sp<=(markers.features.length-1) ){
        console.log('sp1')

        history.push(`/initiative/${markers.features[sp].properties.uid}`)
      }else{
        setSP(markers.features.length-1)
      }
    }
  },[sp, markers.features, initiativeID])

  useEffect(()=>{
    console.log('here', initiative)
    if((!initiative||!initiative.properties)&&!loading){
      history.push('/')
    }
  }, [initiative])
  
  useEffect(()=>{
    
      if(loaded&&initiative&&initiative.properties){
        const map = mapRef.current.getMap()
        const center = initiative.geometry.coordinates
        map.flyTo({ center, offset: [0, -125], zoom: 16 });
      } 
  }, [mapRef, loaded, initiative, mapDimensions.width, mapDimensions.height])

  useEffect(()=>{
    if(postID){setExpanded(true)}else{setExpanded(false)}
  }, [initiativeID, setExpanded])

  return <>
    { alert && (<Collapse in={Boolean(alert)}>
      <Alert severity="info" className={classes.alert} onClose={() => {setAlert(null)}}>
        <AlertTitle>Info</AlertTitle>
        {alert==='loading'?i18n('loading'):
        <>{i18n('alertLinkWasCopied')}<br/>
        <form>
          <TextField style={{paddingBottom:'0.5rem', paddingTop:'0.5rem', width:'100%'}} value={alert}/>
        </form>
        </>}
      </Alert>
  </Collapse>)}
  { isViewerOpen && (<>
    <IconButton 
      aria-label="return"
      style={{position:"absolute", zIndex: 1000, right:"1.5rem", top:"0.5rem"}}
      onClick={()=>{
        setIsViewerOpen(false)
      }}
    >
      <Close  color="primary" />
    </IconButton>
    <ImageViewer
      src={ [initiative.properties.imageURL.l] }
      currentIndex={ 0 }
      onClose={ ()=>{ setIsViewerOpen(false) } }
      zIndex={9}
      style={{zIndex:9}}
    />
  </>)}
  { initiative && initiative.properties && !isViewerOpen && (<Paper 
      className={classes.paper} 
      style={{
        transition: 'all 0.3s',
        cursor: 'pointer', 
        borderRadius: expanded?'0':"5px",
        overflowY: expanded?'scroll':'visible',
        minHeight: expanded?`100%`:'250px',
        maxHeight: expanded?`100%`:'400px',
        width: expanded?'100%':'calc( 100% - 2rem )',
        bottom: expanded?'0':"1rem",
        right: expanded?'0':"1rem",
        willChange: 'height, min-height, width, bottom, right'  
      }}
    > 
    { !expanded && <ArrowNavigation mapRef={mapRef} setSP={setSP} />
    }
    <div id="wrapper">
      <Helmet>
        <title>{"We.city: "+initiative.properties.name}</title>
        <meta property="og:title" content={initiative.properties.name} />
        <meta property="og:site_name" content="We.city" />
        <meta property="og:description" content={initiative.properties.problem} />
        <meta property="og:url" content={"https://weee.city/initiative/"+initiative.properties.uid} />
        <meta property="og:image" content={initiative.properties.imageURL?initiative.properties.imageURL.l: addImage} />
      </Helmet>

      {/* Header Image */}
      <section 
        className={classes.img} 
        alt="Cover of the initiative"
        onClick={()=>{
          console.log('clicked on img')
          if(expanded&&initiativeID){
            setIsViewerOpen(true)
          }else{
            setExpanded(true)
          }
        }}
        style={{
          position:'relative',
          backgroundImage: `url(${initiative.properties.imageURL?initiative.properties.imageURL.s: addImage})`,
          backgroundPosition: 'center',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          borderTopLeftRadius: expanded?0:"5px",
          borderTopRightRadius: expanded?0:"5px"         
      }}>
      </section>

      {/* Actual Initiative */}
      <Box className={classes.info} 
        style={{position:'relative'}}
        onClick={()=>{
          console.log('clicked on card')
          setExpanded(!expanded)
        }}>
        {location && initiative.geometry.coordinates && (
        <span className={classes.span}>
          <LocationOn style={{fontSize: 'large'}} />
          {
            (distance([location.longitude, location.latitude], Object.values(initiative.geometry.coordinates)))<1 ? 
            (distance([location.longitude, location.latitude], Object.values(initiative.geometry.coordinates))*1000).toFixed(0) +i18n('initiativeDistanceFromMeM'):
            ((distance([location.longitude, location.latitude], Object.values(initiative.geometry.coordinates)))<10 ? 
            (distance([location.longitude, location.latitude], Object.values(initiative.geometry.coordinates))).toFixed(1) +i18n('initiativeDistanceFromMeKM'):
            (distance([location.longitude, location.latitude], Object.values(initiative.geometry.coordinates))).toFixed(0) +i18n('initiativeDistanceFromMeKM'))
          } 
        </span>)}
        {/* <span style={{float:'right'}}> <ExpandLess /></span> */}
        <span style={{marginLeft: location?"2rem":undefined}}>
          <People style={{fontSize: 'large'}} /> 
          {initiative.properties.members?initiative.properties.members.length:0}
        </span>
        <Typography variant="h6">
          {initiative.properties.name? initiative.properties.name: "Name is not set"}
        </Typography>
        <IconButton 
          aria-label="return"
          style={{
            position:"absolute", right:'2rem', top:"0rem",
            transitionDuration: '0.3s', transform: expanded?'rotate(180deg)':'rotate(0deg)'
          }}
          onClick={()=>{
            setExpanded(!expanded)
          }}
        >
          <ExpandLess />
        </IconButton>

        {/* Expanded view additions*/}

      </Box>
      <InitiativeContent />
    </div>
  </Paper>)}

  </>
}

export default ({ mapRef, loaded })=> {
  let { initiativeID } = useParams();
  return loaded && (!initiativeID || initiativeID==='explore' ? <Explore mapRef={mapRef} /> : <Initiative mapRef={mapRef} loaded={loaded} />)
}