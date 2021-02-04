import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Button } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { useRecoilState, useSetRecoilState } from 'recoil';
import * as Atoms from 'global/Atoms'
import { useUser } from 'reactfire';
import createInitiativeForm from 'global/forms/createInitiativeForm'
import FormExpanded from 'global/FormExpanded'
import { useHistory } from 'react-router-dom';
import MarkerActive from 'assets/images/markerActive.svg'
import randomstring from 'randomstring'
import { useMutation } from '@apollo/client';
import { createInitiativeMutation } from 'global/Queries'
import { SchemaMetaFieldDef } from 'graphql';
import { useI18n } from 'global/Hooks'
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
    transform: 'translate(-21px, -42px)',
    zIndex: 15
  }
}));


export default ({ getMarker, submit, cancel, variant, submitText, cancelText, mapRef, loaded  })=> {
  const classes = useStyles();
  const theme = useTheme();
  const [isCreating, setIsCreating] = useRecoilState(Atoms.creatingAtom)
  const setMarker = useSetRecoilState(Atoms.markerAtom)
  const setNext = useSetRecoilState(Atoms.nextAtom)
  const user = useUser()
  const [location] = useRecoilState(Atoms.locationAtom)
  const [finished, setFinished] = useState(false)
  const history = useHistory()
  const [offset, setOffset] = useRecoilState(Atoms.offsetAtom)
  const [slideIndex, setSlideIndex] = useRecoilState(Atoms.indexAtom)
  const [feed, setFeed] = useRecoilState(Atoms.initiativeFeed)
  const i18n = useI18n()

  const [addInitiative] = useMutation(createInitiativeMutation, {onCompleted:(data)=>{
    setFinished(true)
    setIsCreating(false)
    setMarker(null)
    setOffset(0)
    setSlideIndex(1)
    setFeed([data.createInitiative])
    console.log('redirect', data.createInitiative.properties.uid)
    history.push(`/initiative/${data.createInitiative.properties.uid}`)
  }})

  useEffect(()=>{
    if( loaded && location ){
      const map = mapRef.current.getMap()
      const center = [location.longitude, location.latitude]
      console.log('fly to create')
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
               {i18n('cancel')}
            </Button>
          ):(
            <Button size="small" onClick={()=>setActiveStep((prevActiveStep) => prevActiveStep - 1)} >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              {i18n('back')}
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
              {i18n('add')}
            </Button>
          ):(
            <Button disabled={!valid} size="small" onClick={()=>setActiveStep((prevActiveStep) => prevActiveStep + 1)}>
              {i18n('next')}
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          )
        }
      />
    </Paper>
  </div>
</>
}