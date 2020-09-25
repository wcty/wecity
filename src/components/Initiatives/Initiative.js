import React, { useState, useEffect, Suspense } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Collapse, Paper, Typography, IconButton, Box, List, ListItem, ListItemText, Button, TextField } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as Atoms from 'global/Atoms'
import { useStorage, useFirestore, useUser, useFirestoreDocData } from 'reactfire'
import { People, LocationOn, ExpandLess, Close } from '@material-ui/icons'
import distance from '@turf/distance'
import translate from '@turf/transform-translate'
import ImageViewer from 'react-simple-image-viewer'
import { useI18n } from 'global/Hooks'
import { DeleteObject } from 'global/Misc'
import moment from 'moment'
import { useParams, Redirect, Route } from 'react-router-dom'
import {Helmet} from "react-helmet"
import { Share } from '@material-ui/icons'
import SelectRole from './SelectRole'
import InitiativeGroup from './InitiativeGroup'
import InitiativeTopic from './InitiativeTopic'

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

export default ({ mapRef, loaded })=> {
  const classes = useStyles();
  const initiatives = useFirestore().collection('initiatives')
  // const [initiative, setInitiative] = useRecoilState(Atoms.initiative)
  const [selected] = useRecoilState(Atoms.selectedAtom)
  const [location] = useRecoilState(Atoms.locationAtom)
  const [expanded, setExpanded] = useRecoilState(Atoms.expanded)
  const mapDimensions = useRecoilValue(Atoms.mapAtom)
  const bar = useRecoilValue(Atoms.barAtom)
  const user = useUser()
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const [markers, setMarkers] = useRecoilState(Atoms.markersAtom)
  const [joining, setJoining] = useRecoilState(Atoms.joiningAtom)
  const images = useStorage().ref().child('initiatives')
  let { initiativeID, postID } = useParams();
  const initiativeRef = useFirestore().collection('initiatives').doc(initiativeID)
  const initiative = useFirestoreDocData(initiativeRef)
  const [redirect, setRedirect] = useState(null)
  const i18n = useI18n()
  const [alert, setAlert] = useState(null)

  //const in = markers.features.find(f=>f.properties.id==id).properties
  // useEffect(()=>{

  //   if(markers && initiativeID){
  //     const selectedInitiative = markers.features.find(f=>f.properties.id==initiativeID)
  //     if(selectedInitiative){
  //       setSelected(initiativeID);
  //       setInitiative( selectedInitiative.properties )
  //     }
  //   }
  //   console.log(match)
  //   console.log(initiativeID)
  // },[markers, initiativeID, setInitiative])
  useEffect(()=>{if(!initiative||!initiative.name){setRedirect('/')}},[initiative])
  useEffect(()=>{
    async function moveMap() {
      if(loaded&&initiative&&initiative.name){
        const map = mapRef.current.getMap()
        const center = Object.values(initiative.coordinates)
        const w = mapDimensions.width/2
        const h = (mapDimensions.height - 350)/2
        const offPoint = Object.values(map.unproject([w,h]))
        const point = Object.values(map.getCenter())
        const dist = distance(point, offPoint)
        const newOffPoint = translate({
          type:"FeatureCollection",
          features:[
            {
              type: "Feature",
              geometry:{
                type: "Point",
                coordinates: center
              }
            }
          ]
        }, dist, 180)
        console.log(newOffPoint.features[0].geometry.coordinates)
        newOffPoint.features[0].geometry.coordinates && map.flyTo({ center: newOffPoint.features[0].geometry.coordinates });
      }
    }
    moveMap()

  }, [mapRef, loaded, initiative, mapDimensions.width, mapDimensions.height])

  useEffect(()=>{
    if(postID){setExpanded(true)}else{setExpanded(false)}
  },[initiativeID, setExpanded])

  useEffect(()=>{
    if(redirect!==null){
      setRedirect(null)
    }
  },[redirect, setRedirect])

  return (<>
    { redirect && <Redirect to={redirect} />}
    { user && initiative.members[user.uid] && (<>
      <Route path={'/initiative/:initiativeID/post/:postID'} >
        <InitiativeTopic initiative={initiative} />
      </Route>
    </>)}
    {alert && (
      <Collapse in={Boolean(alert)}>
        <Alert severity="info" className={classes.alert} onClose={() => {setAlert(null)}}>
          <AlertTitle>Info</AlertTitle>
          {alert==='loading'?i18n('loading'):
          <>{i18n('alertLinkWasCopied')}<br/>
          <form>
            <TextField style={{paddingBottom:'0.5rem', paddingTop:'0.5rem', width:'100%'}} value={alert}/>
          </form>
          </>}
        </Alert>
      </Collapse>
    )}
    {isViewerOpen && (
      <>
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
      src={ [initiative.imageURL.l] }
      currentIndex={ 0 }
      onClose={ ()=>{ setIsViewerOpen(false) } }
      zIndex={9}
      style={{zIndex:9}}
    />
    </>
    )}
    { /*selected &&*/ initiative && initiative.name && !isViewerOpen && (

        <Paper 
          className={classes.paper} 
          style={{
            transition: 'all 0.3s',
            cursor: 'pointer', 
            borderRadius: expanded?'0':"5px",
            overflowY: expanded?'scroll':'hidden',
            minHeight: expanded?`calc(100% - ${bar.height}px)`:'250px',
            maxHeight: expanded?`calc(100% - ${bar.height}px)`:'400px',
            width: expanded?'100%':'calc( 100% - 2rem )',
            bottom: expanded?'0':"1rem",
            right: expanded?'0':"1rem",
            willChange: 'height, min-height, width, bottom, right'  
          }}
        >
          <div id="wrapper">
          <Helmet>
            <title>{"We.city: "+initiative.name}</title>
            <meta property="og:title" content={initiative.name} />
            <meta property="og:site_name" content="We.city" />
            <meta property="og:description" content={initiative.problem} />
            <meta property="og:url" content={"https://weee.city/initiative/"+initiative.id} />
            <meta property="og:image" content={initiative.imageURL?initiative.imageURL.l: addImage} />
          </Helmet>
          <IconButton 
            aria-label="return"
            style={{position:"absolute", right:"1rem", top:"0.5rem", zIndex: 30}}
            onClick={()=>{
              setRedirect('/')
              //setSelected(null)
              setExpanded(false)
              setJoining(false)
            }}
          >
            <Close  color="primary" />
          </IconButton>

          {/* Header Image */}
          <section 
            className={classes.img} 
            alt="Cover of the initiative"
            onClick={()=>{
              console.log('clicked on img')
              if(expanded&&selected){
                setIsViewerOpen(true)
              }else{
                setExpanded(true)
              }
            }}
            style={{
              position:'relative',
              backgroundImage: `url(${initiative.imageURL?initiative.imageURL.s: addImage})`,
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
            {location && initiative.coordinates && (
            <span className={classes.span}>
              <LocationOn style={{fontSize: 'large'}} />
              {
                (distance([location.longitude, location.latitude], Object.values(initiative.coordinates)))<1 ? 
                (distance([location.longitude, location.latitude], Object.values(initiative.coordinates))*1000).toFixed(0) +i18n('initiativeDistanceFromMeM'):
                ((distance([location.longitude, location.latitude], Object.values(initiative.coordinates)))<10 ? 
                (distance([location.longitude, location.latitude], Object.values(initiative.coordinates))).toFixed(1) +i18n('initiativeDistanceFromMeKM'):
                (distance([location.longitude, location.latitude], Object.values(initiative.coordinates))).toFixed(0) +i18n('initiativeDistanceFromMeKM'))
              } 
            </span>)}
            {/* <span style={{float:'right'}}> <ExpandLess /></span> */}
            <span style={{marginLeft: location?"2rem":undefined}}>
              <People style={{fontSize: 'large'}} /> 
              {initiative.members?Object.keys(initiative.members).length-1:0}
            </span>
            <Typography variant="h6">
              {initiative.name? initiative.name: "Name is not set"}
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

          {/* Content */}
          
            { expanded && !joining && <Box style={{padding: '2rem', paddingTop: 0, paddingBottom: 0 }}><List key='elements' disablePadding>

              {initiative.problem&& (<ListItem className={classes.item} disableGutters>
                <ListItemText
                  primary={i18n('initiativeProblem')}
                  secondary={initiative.problem}
                />
              </ListItem>)}
              
              {initiative.outcome&& (<ListItem className={classes.item} disableGutters>
                <ListItemText
                  primary={i18n('initiativeExpectedResult')}
                  secondary={initiative.outcome}
                />
              </ListItem>)}
              {initiative.context && (<ListItem className={classes.item} disableGutters>
                <ListItemText
                  primary={i18n('initiativeCurrentState')}
                  secondary={initiative.context}
                />
              </ListItem>)}
              {initiative.timestamp && (<ListItem className={classes.item} disableGutters>
                <ListItemText
                  primary={i18n('initiativeDateAdded')}
                  secondary={moment(initiative.timestamp.toDate()).format('DD.MM.YYYY')}
                />
              </ListItem>)}
            </List>
            <Box style={{display: "flex", justifyContent: "space-between"}}>
              <Button onClick={()=>{
                  // console.log('click', textarea)
                  // textarea.current.select();
                  // document.execCommand('copy');
                  //e.target.focus();
                  console.log(initiative)
                  if(alert!=="loading"){
                    setAlert("loading")                

                    fetch('https://firebasedynamiclinks.googleapis.com/v1/shortLinks?key=AIzaSyC0R35s-u9bZCZOpwg8jVIzYg77HeKgr0Y', {
                      method: 'post',
                      body: JSON.stringify({
                        "dynamicLinkInfo": {
                          "domainUriPrefix": "https://weee.city/in",
                          "link": `https://weee.city/initiative/${initiative.id}`,
                          "socialMetaTagInfo": {
                            "socialTitle": initiative.name,
                            "socialDescription": initiative.problem,
                            "socialImageLink": initiative.imageURL.l,
                          }
                        },
                        "suffix": {
                          "option": "SHORT"
                        },
                      }),
                    }).then(function(response) {
                      return response.json();
                    }).then(function(text) {
                      console.log(text)
                      var dummy = document.createElement('input')
                      //text = `https://wecity.page.link/?link=https://weee.city/initiative/${initiative.id}&st=${initiative.name}&sd=${initiative.problem}&si=${encodeURI(initiative.imageURL.l)}`;
      
                      document.body.appendChild(dummy);
                      dummy.value = text.shortLink;
                      dummy.select();
                      document.execCommand('copy');
                      document.body.removeChild(dummy);
                      setAlert(text.shortLink)                
                    });
                  }
                  }}>
                  <Share style={{paddingRight:"0.5rem"}} /> {i18n('initiativeShare')}
                </Button>
              { user && initiative && !initiative.members[user.uid] && <Button 
                size="small" 
                variant="contained"  
                color="secondary"
                onClick={async ()=>{    
                  console.log('Приєднатися')
                  setJoining(true)
              }}>
                {i18n('join')}
              </Button>}
              { user && initiative && initiative.members[user.uid] && (<>
                  {Object.keys(initiative.members).length<=2 && 
                  <Button 
                    size="small" 
                    variant="outlined"  
                    color="secondary"
                    onClick={()=>DeleteObject(initiative, initiatives, images, 'initiatives', ()=>{setMarkers({type: "FeatureCollection", features: markers.features.filter(m=>m.properties.id!==initiative.id)}); /*setInitiative(null)*/;})}
                  >
                    {i18n('delete')}
                  </Button>}
                </>)
              }
              </Box> 
              { user && initiative.members[user.uid] && (<>
                  <InitiativeGroup/>
              </>)}
            </Box>}
            

            <Suspense fallback={null}>
            { expanded && joining && <Box style={{padding: '2rem', paddingTop:0}}>
              <SelectRole />
            </Box>}
            </Suspense>
          
          </div>
        </Paper>
    )
  }</>)
}