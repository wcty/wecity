import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, Fab, Grow, List, ListItem, ListItemText, Button } from '@material-ui/core';
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil';
import { creatingAtom, markerAtom , barAtom, markersAtom, selectedAtom, locationAtom, mapAtom } from 'global/Atoms'
import { useStorage, useStorageDownloadURL, useFirestore } from 'reactfire';
import { v1 as uuidv1 } from 'uuid';
import { useGeoFirestore } from 'global/Hooks'
import * as firebase from 'firebase/app';
import { getFeatures } from 'global/Misc';
import { People, LocationOn, ExpandLess, Star, StarBorder } from '@material-ui/icons'
import distance from '@turf/distance'
import {prefix} from 'global/Theme'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 999,
    position: 'fixed',
    transitionDuration: '0.3s',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
  },
  paper:{
    height: "100%",
    minHeight: "250px",
    width: "100%",
    overflow: expanded?'auto':'hidden'
  },
  img: {
    height: '160px',
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    margin: "auto",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
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
  }
}));

export default ({ initiativeID })=> {
  const classes = useStyles();
  const theme = useTheme();
  const [marker, setMarker] = useRecoilState(markerAtom)
  const [markers, setMarkers] = useRecoilState(markersAtom)
  const [imageLoadedURL, setImageLoadedURL] = useState(null)
  const initiatives = useFirestore().collection('markers')
  const [initiative, setInitiative] = useState(null)
  const [selected, setSelected] = useRecoilState(selectedAtom)
  const [isCreating, setIsCreating] = useRecoilState(creatingAtom)
  const [location, setLocation] = useRecoilState(locationAtom)
  const [expanded, setExpanded] = useState(false)
  const map = useRecoilValue(mapAtom)
  const bar = useRecoilValue(barAtom)

  useEffect(()=>{
    console.log(map, bar)
  },[map])
  useEffect(()=>{
    setExpanded(false)
  },[selected])

  useEffect(()=>{
    if(selected) {
      const initiativeRef = initiatives.doc(selected)
      const initiative = initiativeRef.get().then((doc)=>{
        if (doc.exists){
          const data = doc.data()
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

  return (<>
    { selected && initiative && (
      <form className={classes.root} noValidate autoComplete="off"
        style={{
          height: expanded?`calc(100% - ${bar.height}px)`:"250px", 
          maxHeight: expanded?`calc(100% - ${bar.height}px)`:"250px",
          width: expanded?'100%':'calc( 100% - 2rem )',
          bottom: expanded?'0':"1rem",
          right: expanded?'0':"1rem",
        }} 
      >
        <Paper elevation={1} className={classes.paper} 
          style={{cursor: 'pointer', borderRadius: expanded?'0':"5px" }}
        > 
          <Fab className={classes.favourites}
            style={{
              transform: expanded?'translateY(-120%)':'translateY(-50%)',
            }}
            onClick={()=>{
              console.log('clicked on fab')
            }}>
            <StarBorder />
          </Fab>
          <div id="wrapper">
          <section 
            className={classes.img} 
            alt="Cover of the initiative"
            onClick={()=>{
              console.log('clicked on img')
            }}
            style={{
              backgroundImage: `url(${initiative.imageURL || addImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
          }}>
          </section>
          <div className={classes.info}             
            onClick={()=>{
              console.log('clicked on card')
              setExpanded(!expanded)
            }}>
            <span className={classes.span}>
              <LocationOn style={{fontSize: 'large'}} />
              {initiative.coordinates ? (
                <> {
                  (distance([location.longitude, location.latitude], Object.values(initiative.coordinates)))<1 ? 
                  (distance([location.longitude, location.latitude], Object.values(initiative.coordinates))*1000).toFixed(0) +"m from me":
                  ((distance([location.longitude, location.latitude], Object.values(initiative.coordinates)))<10 ? 
                  (distance([location.longitude, location.latitude], Object.values(initiative.coordinates))).toFixed(1) +"km from me":
                  (distance([location.longitude, location.latitude], Object.values(initiative.coordinates))).toFixed(0) +"km from me")
                } 
                </>
              ): <> Distance is unknown </>}
            </span>
            <span style={{float:'right'}}> <ExpandLess /></span>
            <span style={{marginLeft: "2rem"}}>
              <People style={{fontSize: 'large'}} /> 
              {initiative.members?initiative.members.length:0}
            </span>
            <Typography variant="h6">
              {initiative.name? initiative.name: "Name is not set"}
            </Typography>
            {expanded && (<>
              <List>
                {initiative.problem&& (<ListItem>
                  <ListItemText
                    primary="Проблематика"
                    secondary={initiative.problem}
                  />
                </ListItem>)}
                {initiative.outcome&& (<ListItem>
                  <ListItemText
                    primary="Мета:"
                    secondary={initiative.outcome}
                  />
                </ListItem>)}
                {initiative.context && (<ListItem>
                  <ListItemText
                    primary="Передумови:"
                    secondary={initiative.context}
                  />
                </ListItem>)}
                {initiative.timestamp && (<ListItem>
                  <ListItemText
                    primary="Додано:"
                    secondary={initiative.timestamp.toDate().getDay()+"."+initiative.timestamp.toDate().getMonth()+"."+initiative.timestamp.toDate().getFullYear()}
                  />
                </ListItem>)}
              </List>
            </>)}
          </div>
          {expanded && (<Button elevation={15} variant="contained" size="small" 
            style={{zIndex: 200, marginLeft:"1rem",marginBottom:"1rem", color:'white',backgroundColor:'grey'}} 
                onClick={
                console.log('button')
              }>
                Приєднатися
          </Button>)}
          </div>
        </Paper>
    </form>
    )
  }</>)
}