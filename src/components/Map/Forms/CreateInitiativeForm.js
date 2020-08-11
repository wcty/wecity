import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, MobileStepper, InputBase, CircularProgress } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import addImage from 'assets/images/addImage.png'
import { useRecoilState } from 'recoil';
import { creatingAtom, markerAtom , markersAtom, userAtom } from 'global/Atoms'
import { useStorage, useUser,useStorageDownloadURL } from 'reactfire';
import { v1 as uuidv1 } from 'uuid';
import { useGeoFirestore } from 'global/Hooks'
import * as firebase from 'firebase/app';
import { getFeatures } from 'global/Misc'

const formSteps = [
  [
    {
      type: "text",
      id: "name",
      label: "Name and locate your initiative",
      maxLength: 40
    }
  ],
  [
    {
      type: "image", 
      id: "addImage",
      imgPath: addImage,
      label: "+ Add cover image"
    }
  ],
  [
    {
      type: "text",
      id: "problem",
      label: "Describe the problem?",
      rows: 3,
      maxLength: 100
    },
    {
      type: "text",
      id: "outcome",
      label: "Describe expected outcome?",
      rows: 3,
      maxLength: 100
    },
  ],
  [
    {
      type: "text",
      id: "context",
      label: "Describe the context of the initiative?",
      rows: 6,
      maxLength: 100
    },
  ]
];

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
  },
  img: {
    height: '200px',
    maxWidth: 400,
    overflow: 'hidden',
    display: 'block',
    width: '100%',
    margin: "auto",
    borderTopLeftRadius: "5px",
    borderTopRightRadius: "5px",
    objectFit: 'cover'
  },

  MobileStepper:{
    background: "none"
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

export default ({ getMarker })=> {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = formSteps.length;
  const [isCreating, setIsCreating] = useRecoilState(creatingAtom)
  const [marker, setMarker] = useRecoilState(markerAtom)
  const [markers, setMarkers] = useRecoilState(markersAtom)
  const [uuid, setUuid] = useState(uuidv1())
  const imageRef = useStorage().ref().child('initiatives').child(uuid)
  const [imageLoadedURL, setImageLoadedURL] = useState(null)
  const markersCollection = useGeoFirestore().collection('markers')
  const user = useUser()

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  useEffect(()=>{
    console.log(user)
  }, [user])

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Paper elevation={1} className={classes.paper}>  
      {
        formSteps[activeStep].map(( input, i )=>{
          switch (input.type){
            case 'text':
              return (
                <TextField 
                  key={input.id}
                  id={input.id} 
                  label={input.label}
                  className={classes.text}
                  variant="outlined"
                  multiline={input.rows? true: undefined}
                  rows={input.rows? input.rows: undefined}
                  inputProps={{
                    maxLength: input.maxLength
                  }}
                  onChange={(e)=>{
                    setMarker(Object.assign(marker?Object.assign({}, marker):{}, { [input.id]: e.target.value }))
                  }}
                  defaultValue={marker && marker[input.id]?marker[input.id]:""}
                  helperText={`${marker && marker[input.id]?marker[input.id].length:0}/${input.maxLength}`}

                />
              )
            case 'image':
              return (
                <div className={classes.img} key={input.id}>
                  {/* <CircularProgressWithLabel value={progress} /> */}
                  <section 
                    className={classes.img} 
                    key={input.id}
                    alt={input.label}
                    style={{
                      backgroundImage: `url(${imageLoadedURL?imageLoadedURL:input.imgPath})`,
                      backgroundPosition: 'center',
                      backgroundSize: 'cover',
                      backgroundRepeat: 'no-repeat'
                  }}>
                  </section>

                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={(event)=>{
                        var file = event.target.files[0];
                        const uploadTask = imageRef.put(file)
                        // Listen for state changes, errors, and completion of the upload.
                        uploadTask.on('state_changed', // or 'state_changed'
                          function(snapshot) {
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            console.log('Upload is ' + progress + '% done');
                            switch (snapshot.state) {
                              case 'paused': // or 'paused'
                                console.log('Upload is paused');
                                break;
                              case 'running': // or 'running'
                                console.log('Upload is running');
                                break;
                            }
                          }, function(error) {
                            switch (error.code) {
                              case 'storage/unauthorized':
                                // User doesn't have permission to access the object
                                break;

                              case 'storage/canceled':
                                // User canceled the upload
                                break;

                              case 'storage/unknown':
                                // Unknown error occurred, inspect error.serverResponse
                                break;
                            }
                          }, function() {
                            // Upload completed successfully, now we can get the download URL
                            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                              setImageLoadedURL(downloadURL)
                            });
                        });
                    }} />
                    <label htmlFor="contained-button-file">
                      <Button className={classes.imageButton} variant="outlined" component="span" size="small">
                        {imageLoadedURL?"Change Image":input.label }
                      </Button>
                    </label>
                </div>
              );
            default:
              return null;
          }
        })
      }    

      <MobileStepper
        steps={maxSteps}
        position="static"
        variant="text"
        activeStep={activeStep}
        className={classes.MobileStepper}
        nextButton={
          activeStep === (maxSteps - 1) ? (
            <Button color="primary" className={classes.button} variant="contained" size="small" onClick={()=>{
              console.log('submit')
              
              markersCollection.add({
                ...marker,
                timestamp: new Date(),
                imageURL: imageLoadedURL,
                members: [user.uid],
                coordinates: new firebase.firestore.GeoPoint(...getMarker().toArray())
              }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
              })
              .catch(function(error) {
                  console.error("Error adding document: ", error);
              });

              const query = markersCollection.near({ center: new firebase.firestore.GeoPoint(...getMarker().toArray()), radius: 1000 });
              query.get().then((value) => {
                setMarkers({type:"FeatureCollection", features: getFeatures(value) })
                setIsCreating(false)

              });
            }}>
              Submit
            </Button>
          ):(
            <Button size="small" className={classes.button} onClick={handleNext}>
              Next
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          )
        }
        backButton={
          activeStep === 0 ? (
            <Button className={classes.button} variant="contained" size="small" onClick={()=>{
              setIsCreating(false)
              setMarker(null)
              if(imageLoadedURL) imageRef.delete()
            }} >
              Cancel
            </Button>
          ):(
            <Button size="small" className={classes.button} onClick={handleBack} >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Back
            </Button>
          )
        }
      />
      </Paper>
    </form>
  );
}