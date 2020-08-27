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
  const [marker, setMarker] = useRecoilState(Atoms.markerAtom)
  const initiatives = useFirestore().collection('markers')
  const [initiative, setInitiative] = useRecoilState(Atoms.initiative)
  const [selected, setSelected] = useRecoilState(Atoms.selectedAtom)
  const [isCreating, setIsCreating] = useRecoilState(Atoms.creatingAtom)
  const [location, setLocation] = useRecoilState(Atoms.locationAtom)
  const [expanded, setExpanded] = useRecoilState(Atoms.expanded)
  const mapDimensions = useRecoilValue(Atoms.mapAtom)
  const bar = useRecoilValue(Atoms.barAtom)
  const user = useUser()
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const markersCollection = useGeoFirestore().collection('markers')
  const [markers, setMarkers] = useRecoilState(Atoms.markersAtom)
  const [joining, setJoining] = useRecoilState(Atoms.joiningAtom)
  const images = useStorage().ref().child('resources')
  const theme = useTheme()
  const [selectType, setSelectType] = useRecoilState(Atoms.selectType)

return <FormExpanded 
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
                  setSelectType(null)
                }}
              >
                Повернутися
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
              <Button disabled={!valid} size="small" className={classes.button} onClick={()=>setActiveStep(p=>p+1)}>
                Далі
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            )
          )
      }
    />
  }