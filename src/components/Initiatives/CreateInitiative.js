import React, { useState, useEffect, useMemo } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, MobileStepper, InputBase, CircularProgress, Box } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil';
import * as Atoms from 'global/Atoms'
import { useStorage, useUser, useStorageDownloadURL } from 'reactfire';
import { v1 as uuidv1 } from 'uuid';
import { useGeoFirestore } from 'global/Hooks'
import * as firebase from 'firebase/app';
import { getFeatures } from 'global/Misc'
import createInitiativeForm from 'global/forms/createInitiativeForm'
import FormExpanded from 'global/FormExpanded'
import distance from '@turf/distance'
import translate from '@turf/transform-translate'
import { useRouteMatch, Redirect } from 'react-router-dom';
import MarkerActive from 'assets/images/markerActive.svg'


//1920x1080,851x315,484x252,180x180

const useStyles = makeStyles((theme) => ({
  root: {
    width: 'calc( 100% - 2rem )',
    flexGrow: 1,
    zIndex: 999,
    position: 'fixed',
    bottom: "1rem",
    right: "1rem",
    maxHeight: 350,
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
  },
  paper:{
    borderRadius: "5px",
    padding: '1rem',
  },
  marker: {
    position: 'absolute',
    top: 'calc( ( 100% - 350px ) / 2  )',
    left: '50%',
    transform: 'translate(-21px, -42px)'
  }
}));


export default ({ getMarker, submit, cancel, variant, submitText, cancelText, mapRef, loaded  })=> {
  const classes = useStyles();
  const theme = useTheme();
  const [isCreating, setIsCreating] = useRecoilState(Atoms.creatingAtom)
  const [marker, setMarker] = useRecoilState(Atoms.markerAtom)
  const [markers, setMarkers] = useRecoilState(Atoms.markersAtom)

  const markersCollection = useGeoFirestore().collection('markers')
  const user = useUser()
  const [finished, setFinished] = useState(null)

  const [selected, setSelected] = useRecoilState(Atoms.selectedAtom)
  const [location, setLocation] = useRecoilState(Atoms.locationAtom)
  const mapDimensions = useRecoilValue(Atoms.mapAtom)
  const [redirect, setRedirect] = useState(null)

  let match = useRouteMatch()

  useEffect(()=>{
    console.log(match)
    if( loaded && location ){
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
  }, [mapRef, loaded, isCreating, match])

  useEffect(()=>{
    if(redirect!==null){
      setRedirect(null)
    }
  },[redirect,setRedirect])

  return <>
  {redirect && <Redirect to={redirect} />}
  <img alt="Marker for new initiative" src={MarkerActive} className={classes.marker} width={42} height={42} />
  <div className={classes.root}>
    <Paper elevation={1} className={classes.paper}>  
      <FormExpanded 
        directory="markers"
        isFilling={isCreating} 
        formGetter={()=>createInitiativeForm()} 
        floating
        variant='text'
        backButton={(activeStep, setActiveStep, maxSteps, valid, project)=>
          activeStep === 0 ? (
            <Button variant="contained" size="small" onClick={()=>{
              cancel()
            }} >
              {cancelText?cancelText:'Відмінити'}
            </Button>
          ):(
            <Button size="small" onClick={()=>setActiveStep((prevActiveStep) => prevActiveStep - 1)} >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Назад
            </Button>
          )
        }
        nextButton={(activeStep, setActiveStep, maxSteps, valid, imageLoadedURL, project)=>
          activeStep === (maxSteps - 1) ? (
            <Button color="secondary" disabled={!valid} variant="contained" size="small" onClick={async ()=>{     
              console.log(marker)
              markersCollection.add({
                ...marker,
                timestamp: new Date(),
                imageURL: imageLoadedURL,
                members: {ids:[user.uid], [user.uid]:{role: "Initiator"}},
                coordinates: new firebase.firestore.GeoPoint(...getMarker().toArray())
              }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                docRef.update({id:docRef.id})
                setRedirect(`/initiative/${docRef.id}`)
              })
              .catch(function(error) {
                  console.error("Error adding document: ", error);
              });

              const query = markersCollection.near({ center: new firebase.firestore.GeoPoint(...getMarker().toArray()), radius: 1000 });
              query.get().then((value) => {
                setMarkers({type:"FeatureCollection", features: getFeatures(value) })
                setFinished(true)
                setIsCreating(false)
                setMarker(null)
              });

            }}>
              {submitText?submitText:'Додати'}
            </Button>
          ):(
            <Button disabled={!valid} size="small" onClick={()=>setActiveStep((prevActiveStep) => prevActiveStep + 1)}>
              Далі
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          )
        }
      />
    </Paper>
  </div>
</>
}