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

export default ()=>{
  const classes = useStyles();
  const theme = useTheme();

  const projectsCollection = useGeoFirestore().collection('projects')
  const user = useUser()
  const [finished, setFinished] = useState(null)
  const [location, setLocation] = useRecoilState(Atoms.locationAtom)
  const [selectType, setSelectType] = useRecoilState(Atoms.selectType)
  const [expanded, setExpanded] = useRecoilState(Atoms.expanded)
  const [initiative, setInitiative] = useRecoilState(Atoms.initiative)

return <FormExpanded 
      directory="projects"
      isFilling={expanded} 
      formGetter={()=>joinForm(initiative)} 
      backButton={(activeStep, setActiveStep, maxSteps, valid, project)=>
        activeStep === 0 ? (
          <Button className={classes.button} variant="contained" size="small" onClick={()=>{
            setSelectType(null)
          }} >
            Відмінити
          </Button>
        ):(
          <Button size="small" className={classes.button} onClick={()=>setActiveStep((prevActiveStep) => prevActiveStep - 1)} >
            {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            Назад
          </Button>
        )
      }
      nextButton={(activeStep, setActiveStep, maxSteps, valid, imageLoadedURL, project)=>
        activeStep === (maxSteps - 1) ? (
          <Button color="secondary" disabled={!valid} className={classes.button} variant="contained" size="small" onClick={async ()=>{    

            projectsCollection.add({
              ...project,
              timestamp: new Date(),
              imageURL: imageLoadedURL,
              contractors: [user.uid],
              coordinates: new firebase.firestore.GeoPoint(location.longitude, location.latitude)
            }).then(function(docRef) {
              console.log("Document written with ID: ", docRef.id);
              docRef.update({id:docRef.id})
              docRef.get().then(doc=>console.log(doc,doc.data()))
              
              docRef.get().then(doc=>setSelectType({type: "newProject", object: doc.data() }))
              //setSelected(docRef.id)
            })
            .catch(function(error) {
                console.error("Error adding document: ", error);
            });


          }}>
            Додати і приєднатися
          </Button>
        ):(
          <Button disabled={!valid} size="small" className={classes.button} onClick={()=>setActiveStep((prevActiveStep) => prevActiveStep + 1)}>
            Далі
            {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
          </Button>
        )
      }
    />
  }