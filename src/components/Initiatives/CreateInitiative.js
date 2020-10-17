import React, { useState, useEffect, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import * as Atoms from 'global/Atoms'
import { useUser } from 'reactfire';
import { useWindowDimensions } from 'global/Hooks'
import * as firebase from 'firebase/app';
import createInitiativeForm from 'global/forms/createInitiativeForm'
import FormExpanded from 'global/FormExpanded'
import distance from '@turf/distance'
import translate from '@turf/transform-translate'
import { Redirect, useHistory } from 'react-router-dom';
import MarkerActive from 'assets/images/markerActive.svg'
import randomstring from 'randomstring'
import { useMutation } from '@apollo/client';
import { createInitiativeMutation } from 'global/Queries'

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
    top: 'calc( ( 100% - 250px ) / 2  )',
    left: '50%',
    transform: 'translate(-21px, -42px)'
  }
}));


export default ({ getMarker, submit, cancel, variant, submitText, cancelText, mapRef, loaded  })=> {
  const classes = useStyles();
  const theme = useTheme();
  const [isCreating, setIsCreating] = useRecoilState(Atoms.creatingAtom)
  const setMarker = useSetRecoilState(Atoms.markerAtom)
  const setMarkers = useSetRecoilState(Atoms.markersAtom)
  const user = useUser()
  const [location] = useRecoilState(Atoms.locationAtom)
  const [finished, setFinished] = useState(false)
  const history = useHistory()
  const [addInitiative, addedData] = useMutation(createInitiativeMutation, {onCompleted:(data)=>{
    setFinished(true)
    setMarkers(prev=>({type:"FeatureCollection", features: [data.createInitiative, ...prev.features] }))
    setIsCreating(false)
    setMarker(null)
    history.push(`/initiative/${data.createInitiative.properties.uid}`)
  }})

  useEffect(()=>{
    if( loaded && location ){
      const map = mapRef.current.getMap()
      const center = [location.longitude, location.latitude]

      map.flyTo({ center, offset:[0, -125] });
    }
  }, [mapRef, loaded, isCreating])

  return <>
  <img alt="Marker for new initiative" src={MarkerActive} className={classes.marker} width={42} height={42} />
  <div className={classes.root}>
    <Paper elevation={1} className={classes.paper}>  
      <FormExpanded 
        directory="initiatives"
        isFilling={isCreating} 
        formGetter={()=>createInitiativeForm()} 
        floating
        variant='text'
        finished={finished}
        setFinished={setFinished}
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
              setFinished(true)
              const submission = {
                variables: { 
                  initiative:{
                    properties:{
                      ...project,
                      type: "Initiative",
                      uid: randomstring.generate(20),
                      timestamp: (new Date()).toISOString(),
                      imageURL: imageLoadedURL,
                      members: [{uid:user.uid, roles: {Initiator:true}}]
                    },
                    geometry: {
                      type: "Point",
                      coordinates: getMarker().toArray()
                    }
                  }
                }
              }
              addInitiative(submission)
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