import React, { useState, useRef, useEffect, Suspense } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Paper, Typography, Fab, IconButton, Box, List, ListItem, ListItemText, Button } from '@material-ui/core'
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as Atoms from 'global/Atoms'
import { useStorage, useStorageDownloadURL, useFirestore, useUser } from 'reactfire'
import { People, LocationOn, ExpandLess, KeyboardArrowLeft, KeyboardArrowRight, Close } from '@material-ui/icons'
import distance from '@turf/distance'
import translate from '@turf/transform-translate'
import { render } from 'react-dom'
import ImageViewer from 'react-simple-image-viewer'
import { useGeoFirestore } from 'global/Hooks'
import { getFeatures } from 'global/Misc'
import firebase from 'firebase'
import useMeasure from 'use-measure'
import FormExpanded from 'global/FormExpanded'
import createProjectForm from 'global/forms/createProjectForm'
import { Redirect } from 'react-router-dom'

const useStyles = makeStyles((theme)=>({
  root: {
    flexGrow: 1,
    zIndex: -1,
    position: 'fixed', 
    width:'100%',
    bottom: '0',
    right: '0',
    borderRadius: '0',
    overflowX: "hidden",
    overflowY: 'scroll',
    padding: '1rem',
    paddingTop: 0,
    paddingBottom: 0,
    boxSizing: 'border-box',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
    },
  },
  button:{
    margin: "0.5rem"
  }
}))

export default ({ submit, cancel, variant, submitText, cancelText })=>{
  const classes = useStyles();
  const theme = useTheme();

  const projectsCollection = useGeoFirestore().collection('projects')
  const user = useUser()
  const [location, setLocation] = useRecoilState(Atoms.locationAtom)
  const [selectType, setSelectType] = useRecoilState(Atoms.selectType)
  const [expanded, setExpanded] = useRecoilState(Atoms.expanded)
  const [finished, setFinished] = useState(false)
  const bar = useRecoilValue(Atoms.barAtom)
  const [redirect, setRedirect] = useState()
  useEffect(()=>{
    if(redirect){
      setRedirect(null)
    }
  },[redirect])

return <Paper elevation={1} className={classes.root}
        style={{
          height: `calc(100% - ${bar.height}px)`,
          marginBottom: "1rem",
        }}
      > 
      {redirect && <Redirect to={redirect}/>}
      <FormExpanded 
        directory="projects"
        isFilling={expanded} 
        formGetter={()=>createProjectForm()} 
        variant={variant}
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

              projectsCollection.add({
                ...project,
                timestamp: new Date(),
                imageURL: imageLoadedURL,
                contractor: user.displayName,
                contractors: [user.uid],
                coordinates: new firebase.firestore.GeoPoint(location?location.longitude:30.5234, location?location.latitude:50.4501)
              }).then(function(docRef) {
                setFinished(true)
                console.log("Document written with ID: ", docRef.id);
                docRef.update({id: docRef.id})              
                docRef.get().then(doc=>submit(docRef, doc))
                //setSelected(docRef.id)
              })
              .catch(function(error) {
                  console.error("Error adding document: ", error);
              });
              setRedirect('/projects')

            }}>
              {submitText?submitText:'Додати і приєднатися'}
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
  }