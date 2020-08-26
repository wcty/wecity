import React, { useState, useRef, useEffect, Suspense } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Paper, Typography, Fab, IconButton, Box, List, ListItem, ListItemText, Button } from '@material-ui/core'
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil'
import { creatingAtom, markerAtom, joiningAtom, markersAtom, barAtom,  selectedAtom, locationAtom, mapAtom } from 'global/Atoms'
import { useStorage, useStorageDownloadURL, useFirestore, useUser } from 'reactfire'
import { People, LocationOn, ExpandLess, KeyboardArrowLeft, KeyboardArrowRight, Close } from '@material-ui/icons'
import distance from '@turf/distance'
import translate from '@turf/transform-translate'
import { render } from 'react-dom'
import ImageViewer from 'react-simple-image-viewer'
import { useGeoFirestore } from 'global/Hooks'
import JoinInitiative from './JoinInitiative'
import { getFeatures } from 'global/Misc'
import firebase from 'firebase'
import useMeasure from 'use-measure'
import FormExpanded from 'global/FormExpanded'
import joinForm from 'global/forms/joinForm'

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
  text:{
    width: "calc( 100% - 2rem )",
    margin: "1rem",
    marginBottom: 0,
    position: "relative"
  },
  button:{
    margin: "0.5rem"
  },
  imageButton: {
    position: "absolute",
    top: "1rem",
    left: "1rem"
  },
  input: {
    display: 'none',
  },
  info:{
    padding: theme.spacing(2),
    //height:'100%',
    width: '100%'
  },
  favourites:{
    position: 'absolute',
    left: theme.spacing(2),
    top: 0,
    backgroundColor: 'white',
    transitionDuration: '0.3s'
  },
  backButton:{
    zIndex: 200, 
    margin:"0.5rem", 
    color:'white',
  },
  nextButton:{
    zIndex: 200, 
    margin:"0.5rem", 
    color:'white',
  }
}));

export default ({ mapRef, loaded, getMarker })=> {
  const classes = useStyles();
  const [marker, setMarker] = useRecoilState(markerAtom)
  const initiatives = useFirestore().collection('markers')
  const [initiative, setInitiative] = useState(null)
  const [selected, setSelected] = useRecoilState(selectedAtom)
  const [isCreating, setIsCreating] = useRecoilState(creatingAtom)
  const [location, setLocation] = useRecoilState(locationAtom)
  const [expanded, setExpanded] = useState(false)
  const mapDimensions = useRecoilValue(mapAtom)
  const bar = useRecoilValue(barAtom)
  const user = useUser()
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const markersCollection = useGeoFirestore().collection('markers')
  const [markers, setMarkers] = useRecoilState(markersAtom)
  const [joining, setJoining] = useRecoilState(joiningAtom)
  const images = useStorage().ref().child('initiatives')
  const theme = useTheme()

  useEffect(async()=>{
    if(loaded&&initiative){
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
  }, [mapRef, loaded, initiative])

  useEffect(()=>{
    if( loaded && isCreating && location ){
      const map = mapRef.current.getMap()
      const w = mapDimensions.width/2
      const h = (mapDimensions.height - 350)/2
      const offPoint = Object.values(map.unproject([w,h]))
      const point = Object.values(map.getCenter())
      const dist = distance(point, offPoint)
      const center = [location.longitude, location.latitude]
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
      map.flyTo({ center: newOffPoint.features[0].geometry.coordinates });
    }
  }, [mapRef, loaded, isCreating])

  useEffect(()=>{
    if(selected) {
      const initiativeRef = initiatives.doc(selected)
      const initiative = initiativeRef.get().then((doc)=>{
        if (doc.exists){
          console.log(document)
          const data = doc.data()
          //data.id = doc.id
          delete data.g
          console.log("Document data:", data);
          setInitiative(data);
        }else{
          //console.log("No such document!");
          setInitiative(null);
        }
      })
      setIsCreating(false)
      setMarker(null)
    }
  }, [selected])

  useEffect(()=>{
    initiative && user && console.log(initiative.members, user.uid)
  },[initiative, user])

  return (<>
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
      zIndex={300}
      style={{zIndex:300}}
    />
    </>
    )}
    { selected && initiative && !isViewerOpen && (
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
          <IconButton 
            aria-label="return"
            style={{position:"absolute", right:"1rem", top:"0.5rem", zIndex: 30}}
            onClick={()=>{
              setSelected(null)
              setExpanded(false)
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
                (distance([location.longitude, location.latitude], Object.values(initiative.coordinates))*1000).toFixed(0) +"м від мене":
                ((distance([location.longitude, location.latitude], Object.values(initiative.coordinates)))<10 ? 
                (distance([location.longitude, location.latitude], Object.values(initiative.coordinates))).toFixed(1) +"км від мене":
                (distance([location.longitude, location.latitude], Object.values(initiative.coordinates))).toFixed(0) +"км від мене")
              } 
            </span>)}
            <span style={{float:'right'}}> <ExpandLess /></span>
            <span style={{marginLeft: location?"2rem":undefined}}>
              <People style={{fontSize: 'large'}} /> 
              {initiative.members?Object.keys(initiative.members).length:0}
            </span>
            <Typography variant="h6">
              {initiative.name? initiative.name: "Name is not set"}
            </Typography>
            <IconButton 
              aria-label="return"
              style={{
                position:"absolute", right:"3rem", top:"0rem",
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

          {/* Buttons Delete & Join */}
          <Suspense fallback={null}>
          {expanded &&
            <FormExpanded 
              isFilling={expanded} 
              formGetter={()=>joinForm(initiative)} 
              backButton={(activeStep, setActiveStep, maxSteps, valid)=>
                initiative.members[user?user.uid:null] ? (

                  //Delete Initiative Button
                  Object.keys(initiative.members).length<2 ? 
                    (<>
                      {/* <Typography style={{marginLeft:'1rem', marginBottom:'1rem'}}>Ви щойно створили цю ініціативу!</Typography> */}
                      <Button 
                        elevation={15} 
                        variant="contained" 
                        color="secondary"
                        size="small"
                        className={classes.backButton}
                        onClick={async ()=>{
                          console.log(initiative.id)
                          if(initiative.id){
                            initiatives.doc(initiative.id).delete().then(function() {
                              Object.values(initiative.imageURL).forEach((url)=>{
                                const fileName = url.split('?')[0].split('initiatives%2F').reverse()[0]
                                images.child(fileName).delete().then(function() {
                                }).catch(function(error) {
                                  console.log('Errored at image deletion', error)
                                });
                              })
                              setSelected(null)
                              setMarkers({type:"FeatureCollection", features: markers.features.filter(f=>f.properties.id!=initiative.id) })
                            }).catch(function(error) {
                                console.error("Error removing document: ", error);
                            });
                          }else{console.log(initiative)}
                        }}
                      >
                        Видалити
                      </Button>
                    </>):
                    (<>
                      {/* <Typography style={{marginLeft:'2rem', marginBottom:'2rem'}}>Ви вже долучилися до цієї ініціативи!</Typography> */}
                      <Button 
                        elevation={15} 
                        variant="contained" 
                        //color="secondary"
                        size="small"
                        className={classes.backButton}
                        onClick={async ()=>{
                          console.log(initiative.id, "Покинути")
                        }}
                      >
                        Покинути
                      </Button>
                    </>)
                  ):(
                    activeStep === (0) ? (
                      //Закрити Initiative Button
                      <Button 
                        elevation={15} 
                        variant="contained" 
                        size="small"
                        // color="secondary"
                        className={classes.backButton}
                        onClick={async ()=>{
                          console.log(initiative.id, "Закрити")
                          setSelected(null)
                          setInitiative(null)
                        }}
                      >
                        Закрити
                      </Button>
                    ):(
                      <Button size="small" className={classes.button} onClick={()=>setActiveStep(p=>p-1)} >
                        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                        Назад
                      </Button>
                    )

                  )
              }
              nextButton={(activeStep, setActiveStep, maxSteps, valid)=>
                  !initiative.members[user?user.uid:null] && (
                    activeStep === (maxSteps - 1) ? (
                      <Button 
                        size="small" 
                        disabled={!valid} 
                        className={classes.nextButton}
                        variant="contained"  
                        color="secondary"
                        onClick={async ()=>{    
                          console.log('Приєднатися')
                      }}>
                        Приєднатися
                      </Button>
                    ):(
                      activeStep===0 ? (
                        <Button 
                          elevation={15} 
                          size="small" 
                          variant="contained"
                          color="secondary" 
                          className={classes.nextButton}
                          onClick={()=>{
                            console.log('button')
                            //setJoining(true)
                            setActiveStep(p=>p+1)
                          }}
                        >
                          Приєднатися
                        </Button>
                      ):(
                        <Button disabled={!valid} size="small" className={classes.button} onClick={()=>setActiveStep(p=>p+1)}>
                          Далі
                          {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
                        </Button>
                      )
                    )
                  )
              }
            />}
          </Suspense>
          
          </div>
        </Paper>
    )
  }</>)
}