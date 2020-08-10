import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, MobileStepper, InputBase } from '@material-ui/core';
import addImage from 'assets/images/addImage.png'
import { useRecoilState } from 'recoil';
import { creatingAtom, markerAtom , markersAtom, selectedAtom } from 'global/Atoms'
import { useStorage, useStorageDownloadURL, useFirestore } from 'reactfire';
import { v1 as uuidv1 } from 'uuid';
import { useGeoFirestore } from 'global/Hooks'
import * as firebase from 'firebase/app';
import { getFeatures } from 'global/Misc';

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

  useEffect(()=>{
    if(selected) {
      const initiativeRef = initiatives.doc(selected)
      const initiative = initiativeRef.get().then((doc)=>{
        if (doc.exists){
          const data = doc.data()
          delete data.g
          console.log("Document data:", data);
          setInitiative(data);
          //  { context, coordinates, name, outcome, problem, timestamp, imageURL }

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
      { initiative && (
        <Paper elevation={1} className={classes.paper}> 
          <img
            className={classes.img}
            src={initiative.imageURL || addImage}
            alt="Cover of the initiative"
          />
        </Paper>
        )
      }
    </form>
  );
}