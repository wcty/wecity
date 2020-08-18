import React, { useState, useEffect, useMemo } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, TextField, Button, MobileStepper, InputBase, CircularProgress, Box } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import addImage from 'assets/images/addImage.png'
import { useRecoilState } from 'recoil';
import { creatingAtom, markerAtom , markersAtom, userAtom, selectedAtom } from 'global/Atoms'
import { useStorage, useUser, useStorageDownloadURL } from 'reactfire';
import { v1 as uuidv1 } from 'uuid';
import { useGeoFirestore } from 'global/Hooks'
import * as firebase from 'firebase/app';
import { getFeatures } from 'global/Misc'
import ErrorBoundary from 'global/ErrorBoundary'

//1920x1080,851x315,484x252,180x180

const formSteps = [
  [
    {
      type: "note",
      id: "notes",
      label: "Рухайте мапу щоб навести відмітку ініціативи (червоний маркер) на необхідну локацію, додайте назву і натисніть Далі.",
    },
    {
      type: "text",
      id: "name",
      label: "Назва вашої ініціативи",
      maxLength: 40
    }
  ],
  [
    {
      type: "image", 
      id: "addImage",
      imgPath: addImage,
      label: "+ Додайте титульне фото"
    }
  ],
  [
    {
      type: "text",
      id: "problem",
      label: "Яку проблему має вирішити ініціатива?",
      rows: 2,
      maxLength: 300
    },
    {
      type: "text",
      id: "outcome",
      label: "Опишіть очікувані результати:",
      rows: 1,
      maxLength: 300
    },
  ],
  [
    {
      type: "text",
      id: "context",
      label: "Передумови для реалізації:",
      rows: 6,
      maxLength: 300
    },
  ]
];

function CircularProgressWithLabel(props) {

  return (
   <Box         
      top={"50%"}
      left={"50%"}
      style={{transform: "translate(-50%, -100%)"}}
      position="absolute"
      alignItems="center"
      justifyContent="center" 
    >
      <CircularProgress variant="static" {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Typography variant="caption" style={{visibility: props.style.visibility}} component="div" color="textSecondary">{`${Math.round(
          props.value,
        )}%`}</Typography>
      </Box>
    </Box>
  );
}
function CircularProgressWithoutLabel(props) {

  return (
   <Box         
      top={"50%"}
      left={"50%"}
      style={{transform: "translate(-50%, -100%)"}}
      position="absolute"
      alignItems="center"
      justifyContent="center" 
    >
      <CircularProgress {...props} />
      <Box
        top={0}
        left={0}
        bottom={0}
        right={0}
        position="absolute"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
      </Box>
    </Box>
  );
}

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
const useCheckImage = async (url)=>{
  console.log('use')
}

export default ({ getMarker })=> {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = formSteps.length;
  const [isCreating, setIsCreating] = useRecoilState(creatingAtom)
  const [marker, setMarker] = useRecoilState(markerAtom)
  const [markers, setMarkers] = useRecoilState(markersAtom)
  const [uuid, setUuid] = useState(uuidv1())
  const imageRef = useStorage().ref().child('initiatives')

  const [imageLoadedURL, setImageLoadedURL] = useState(null)
  const [thumbLoadedURL, setThumbLoadedURL] = useState(null)

  const markersCollection = useGeoFirestore().collection('markers')
  const user = useUser()
  const [progressState, setProgress] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [finished, setFinished] = useState(null)

  const [selected, setSelected] = useRecoilState(selectedAtom)
  const [valid, setValid] = useState(false)

  useEffect(async()=>{
    let bool = true
    if(marker){
      formSteps[activeStep].forEach((d,i)=>{
        if(d.type=='image'){
          if(!(imageLoadedURL)) bool = false
        }else if(d.type!='note'){
          if(!(marker[d.id]&&marker[d.id].length>0)) bool = false
        }
      })
      setValid(bool)
    }
    console.log(bool)
  },  [activeStep, marker, imageLoadedURL])

  useEffect(()=>{
    if(fileName){
      let i = 0
      WaitResize()
      function WaitResize(){
        console.log(fileName)
        const extension = '.'+fileName.split('.').reverse()[0]
        imageRef.child( fileName.replace(extension,'_484x252'+extension) ).getDownloadURL().then(onResolve, onReject)
        function onResolve(foundURL) {
            //stuff
            setThumbLoadedURL(foundURL)
            console.log('exists')
        }
        function onReject(error) {
            console.log(error.code);
            i+=1
            if(i<10) setTimeout(WaitResize, 1000)
        }
      }
    }
  }, [imageLoadedURL])
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const Reset = ()=>{
    setFileName(null)
    setUuid(uuidv1())
    setImageLoadedURL(null)
    setThumbLoadedURL(null)
    setMarker(null)
    setActiveStep(0)
    setFinished(false)
  }
  const DeleteImage = ()=>{
    ////1920x1080,851x315,484x252,180x180
    const extension = '.'+fileName.split('.').reverse()[0]

    imageRef.child(fileName.replace(extension,'_180x180'+extension)).delete()
    imageRef.child(fileName.replace(extension,'_484x252'+extension)).delete()
    imageRef.child(fileName.replace(extension,'_851x315'+extension)).delete()
    imageRef.child(fileName.replace(extension,'_1920x1080'+extension)).delete()
  }
  useEffect(()=>{
    if(!isCreating){
      if(imageLoadedURL&&!finished){
        console.log('cancelled image upload')
        DeleteImage()
      }
      if(!finished){
        console.log('cancelled input data')
        Reset()
      }
    }
  }, [isCreating])

  return isCreating && (
    <form className={classes.root} autoComplete="off">
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
                  required
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
            case 'note':
              return (
                <Typography
                  key={input.id}
                  id={input.id} 
                  className={classes.text}
                  variant="body2"
                  style={{
                    textAlign:'center',
                    marginTop:'2rem',
                    paddingTop: '2rem',
                    paddingBottom: '1rem'
                  }}
                >
                  {input.label}
                </Typography>
              )
              
            case 'image':
              return (
                <div className={classes.img} key={input.id}>
                  <CircularProgressWithLabel value={progressState} style={{color: "#ffffff", visibility:progressState?"visible":"hidden"}}/> 
                  <CircularProgressWithoutLabel style={{color: "#ffffff", visibility:(imageLoadedURL&&!progressState&&!thumbLoadedURL)?"visible":"hidden"}}/>
                  <ErrorBoundary>
                    <section 
                      className={classes.img} 
                      key={input.id}
                      alt={input.label}
                      style={{
                        backgroundImage: `url(${thumbLoadedURL?thumbLoadedURL:input.imgPath})`,
                        backgroundPosition: 'center',
                        backgroundSize: 'cover',
                        backgroundRepeat: 'no-repeat'
                    }}>
                    </section>
                  </ErrorBoundary>
                    <input
                      accept="image/*"
                      className={classes.input}
                      id="contained-button-file"
                      multiple
                      required
                      type="file"
                      onChange={(event)=>{
                        if(imageLoadedURL&&!finished){
                          console.log('cancelled image upload')
                          DeleteImage()
                          setFileName(null)
                          setImageLoadedURL(null)
                          setThumbLoadedURL(null) 
                          //setUuid(uuidv1())
                        }
                        var file = event.target.files[0];
                        console.log(file)
                        const newName = uuid + '.' + file.name.split(".").reverse()[0]
                        setFileName(newName)
                        const uploadTask = imageRef.child(newName).put(file)
                        // Listen for state changes, errors, and completion of the upload.
                        uploadTask.on('state_changed', // or 'state_changed'
                          function(snapshot) {
                            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                            //console.log('Upload is ' + progress + '% done');
                            setProgress(progress)
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
                            setProgress(null)
                            uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
                              console.log(downloadURL)
                              const extension = '.'+downloadURL.split('?')[0].split('.').reverse()[0]
                              setImageLoadedURL({
                                xs: downloadURL.replace(extension, '_180x180'+extension),
                                s: downloadURL.replace(extension, '_484x252'+extension),
                                m: downloadURL.replace(extension, '_851x315'+extension),
                                l: downloadURL.replace(extension, '_1920x1080'+extension),
                              })
                              //https://firebasestorage.googleapis.com/v0/b/wecity-223ab.appspot.com/o/projects%2F95c41060-ddf2-11ea-946d-d9f5de7a931b.jpg?alt=media&token=ee801c80-3f84-479e-8b99-f1cf7f1d8aed
                              console.log(imageLoadedURL, !progressState, !thumbLoadedURL)                    

                            });
                        });
                    }} />
                    <label htmlFor="contained-button-file">
                      <Button className={classes.imageButton} color="default" variant={thumbLoadedURL?"contained":"outlined"} component="span" size="small" disableElevation>
                        {imageLoadedURL?"Змінити фото":input.label }
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
            <Button disabled={!valid} className={classes.button} variant="contained" size="small" onClick={async ()=>{    
              markersCollection.add({
                ...marker,
                timestamp: new Date(),
                imageURL: imageLoadedURL,
                members: [user.uid],
                coordinates: new firebase.firestore.GeoPoint(...getMarker().toArray())
              }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                docRef.update({id:docRef.id})
                setSelected(docRef.id)
              })
              .catch(function(error) {
                  console.error("Error adding document: ", error);
              });

              const query = markersCollection.near({ center: new firebase.firestore.GeoPoint(...getMarker().toArray()), radius: 1000 });
              query.get().then((value) => {
                setMarkers({type:"FeatureCollection", features: getFeatures(value) })
                setFinished(true)
                setIsCreating(false)
              });
            }}>
              Додати
            </Button>
          ):(
            <Button size="small" className={classes.button} onClick={handleNext} disabled={!valid}>
              Далі
              {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </Button>
          )
        }
        backButton={
          activeStep === 0 ? (
            <Button className={classes.button} variant="contained" size="small" onClick={()=>{
              setIsCreating(false)
            }} >
              Відмінити
            </Button>
          ):(
            <Button size="small" className={classes.button} onClick={handleBack} >
              {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
              Назад
            </Button>
          )
        }
      />
      </Paper>
    </form>
  );
}