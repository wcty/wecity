import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, MobileStepper, InputBase } from '@material-ui/core';
import addImage from 'assets/images/addImage.png'
import { useRecoilState } from 'recoil';
import { creatingAtom, markerAtom , markersAtom, selectedAtom, locationAtom } from 'global/Atoms'
import { useStorage, useStorageDownloadURL, useFirestore } from 'reactfire';
import { v1 as uuidv1 } from 'uuid';
import { useGeoFirestore } from 'global/Hooks'
import * as firebase from 'firebase/app';
import { getFeatures } from 'global/Misc';
import { People, LocationOn } from '@material-ui/icons'
import distance from '@turf/distance'

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
    minHeight: "250px",
    width: "100%"
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
    padding: theme.spacing(2)
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
          console.log("No such document!");
          setInitiative(null);
        }
      })
      setIsCreating(false)
      setMarker(null)
    }
  }, [selected])

  return (
    <form className={classes.root} noValidate autoComplete="off">
      { selected && initiative && (
        <Paper elevation={1} className={classes.paper}> 
          <section 
            className={classes.img} 
            alt="Cover of the initiative"
            style={{
              backgroundImage: `url(${initiative.imageURL || addImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat'
          }}>
          </section>
          <div className={classes.info}>
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
            <span style={{marginLeft: "2rem"}}>
              <People style={{fontSize: 'large'}} /> 
              {initiative.members?initiative.members.length:0}
            </span>
            <Typography variant="h6">
              {initiative.name? initiative.name: "Name is not set"}
            </Typography>
          </div>
        </Paper>
        )
      }
    </form>
  );
}