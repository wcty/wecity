import React, { useState, useEffect, useMemo, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, FormControl, InputLabel, Select, MenuItem, Typography, TextField, Button, MobileStepper, InputBase, CircularProgress, Box } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil';
import { creatingAtom, userAtom, locationAtom, mapAtom } from 'global/Atoms'
import { useStorage, useUser, useStorageDownloadURL } from 'reactfire';
import { v1 as uuidv1 } from 'uuid';
import { useGeoFirestore } from 'global/Hooks'
import * as firebase from 'firebase/app';
import { getFeatures } from 'global/Misc'
import ErrorBoundary from 'global/ErrorBoundary'
import useMeasure from 'use-measure';

//1920x1080,851x315,484x252,180x180

const formSteps = [
  [
    {
      type: "image", 
      id: "addImage",
      imgPath: addImage,
      label: "+ Додайте титульну картинку"
    },
    {
      type: "text",
      id: "name",
      label: "Назва вашого проекту",
      maxLength: 40
    },
    {
      type: "text",
      id: "contractor",
      label: "Ім'я виконавця",
      maxLength: 40
    },
    {
      type: "text",
      id: "location",
      label: "Місце виробництва",
      maxLength: 300
    }
  ],
  [
    {
      type: "select",
      id: "category",
      label: "Оберіть категорію проекту",
      options:[
        "Озеленення",
        "Громадські простори",
        "Побутові",
        "Відпочинок",
        "Допомога",
        "Мистецтво",
        "Бізнес",
        "Інше"
      ]
    },
    {
      type: "text",
      id: "problem",
      label: "Яку проблему він має вирішити?",
      rows: 3,
      maxLength: 300
    },
    {
      type: "text",
      id: "description",
      label: "Опишіть проект:",
      rows: 8,
      maxLength: 1000
    },
  ],
  [
    {
      type: "text",
      id: "experience",
      label: "Який маєте досвід для реалізації?",
      rows: 8,
      maxLength: 300
    },
    {
      type: "text",
      id: "resource",
      label: "Які негрошові ресурси необхідні?",
      rows: 8,
      maxLength: 300
    },
  ],
  [
    {
      type: "text",
      id: "volunteers",
      label: "Скільки волонтерів вам буде потрібно?",
      maxLength: 3
    },
    {
      type: "text",
      id: "volunteersTask",
      label: "Які задачі мають виконувати волонтери?",
      rows: 4,
      maxLength: 300
    },
    {
      type: "text",
      id: "price",
      label: "Який мінімальний необхідний бюджет?",
      maxLength: 10
    },
    {
      type: "text",
      id: "budgetDescription",
      label: "Які витрати має покривати бюдет?",
      rows: 4,
      maxLength: 300
    },
  ],
];

function CircularProgressWithLabel(props) {

  return (
  <Box         
    top={"100px"}
    left={"50%"}
    style={{transform: "translate(-50%, -50%)"}}
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
      top={"100px"}
      left={"50%"}
      style={{transform: "translate(-50%, -50%)"}}
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
    width: '100%',
    position: 'absolute',
    flexGrow: 1,
    zIndex: 999,
    minHeight: '100%',
    // overflowY: "auto",
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
  },
  paper:{
    minHeight:'100%',
    position: 'absolute',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
    // position: 'relative',
  },
  img: {
    height: '200px',
    maxWidth: 400,
    display: 'block',
    width: '100%',
    margin: "auto",
    objectFit: 'cover'
  },

  MobileStepper:{
    background: "none",
    position:'absolute',
    width:'calc(100% - 1rem)',
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

export default ({ isCreating, setIsCreating })=> {
  const classes = useStyles();
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = formSteps.length;
  const [project, setProject] = useState(null)
  const [uuid, setUuid] = useState(uuidv1())
  const imageRef = useStorage().ref().child('projects')

  const [imageLoadedURL, setImageLoadedURL] = useState(null)
  const [thumbLoadedURL, setThumbLoadedURL] = useState(null)

  const projectsCollection = useGeoFirestore().collection('projects')
  const user = useUser()
  const [progressState, setProgress] = useState(null)
  const [fileName, setFileName] = useState(null)
  const [finished, setFinished] = useState(null)
  const [location, setLocation] = useRecoilState(locationAtom)
  const map = useRecoilValue(mapAtom)
  const [valid, setValid] = useState(false)

  useEffect(async()=>{
    let bool = true
    if(project){
      formSteps[activeStep].forEach((d,i)=>{
        if(d.type=='image'){
          if(!(imageLoadedURL)) bool = false
        }else if(d.type!='note'){
          if(!(project[d.id]&&project[d.id].length>0)) bool = false
        }
      })
      setValid(bool)
    }
    console.log(bool)
  },  [activeStep, project, imageLoadedURL])

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
    setProject(null)
    setActiveStep(0)
    setFinished(false)
  }
  
  const DeleteImage = ()=>{
    const extension = '.'+fileName.split('.').reverse()[0]

    ////1920x1080,851x315,484x252,180x180
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
    <form className={classes.root} noValidate autoComplete="off"  >
      {/* <Paper elevation={1} className={classes.paper} >   */}
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
                    setProject(Object.assign(project?Object.assign({}, project):{}, { [input.id]: e.target.value }))
                  }}
                  defaultValue={project && project[input.id]?project[input.id]:""}
                  helperText={`${project && project[input.id]?project[input.id].length:0}/${input.maxLength}`}
                />
              )
            case 'select':
              return (
                <FormControl variant="outlined" key={input.id} className={classes.formControl} 
                  style={{width: 'calc(100% - 2rem)', marginLeft:'1rem', marginTop:'1rem'}}>
                  <InputLabel id={input.id} key={input.id+'lbl'} >{input.label}</InputLabel>
                  <Select
                    key={input.id} 
                    labelId={input.id}
                    id={input.id}
                    value={project && project[input.id]?project[input.id]:""}
                    onChange={(e)=>{
                      setProject(Object.assign(project?Object.assign({}, project):{}, { [input.id]: e.target.value }))
                    }}
                    label={input.label}
                  >
                    {input.options.map(opt=><MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                  </Select>
                </FormControl>
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
        position={map.height<600?"static":"bottom"}

        variant="text"
        activeStep={activeStep}
        className={classes.MobileStepper}
        nextButton={
          activeStep === (maxSteps - 1) ? (
            <Button disabled={!valid} className={classes.button} variant="contained" size="small" onClick={async ()=>{    

              projectsCollection.add({
                ...project,
                timestamp: new Date(),
                imageURL: imageLoadedURL,
                contractors: [user.uid],
                coordinates: new firebase.firestore.GeoPoint(location.longitude, location.latitude)
              }).then(function(docRef) {
                console.log("Document written with ID: ", docRef.id);
                docRef.update({id:docRef.id})
                //setSelected(docRef.id)
              })
              .catch(function(error) {
                  console.error("Error adding document: ", error);
              });

              const query = projectsCollection.near({ center: new firebase.firestore.GeoPoint(location.longitude, location.latitude), radius: 1000 });
              query.get().then((value) => {
                //setProjects({type:"FeatureCollection", features: getFeatures(value) })
                setFinished(true)
                setIsCreating(false)
              });
            }}>
              Додати
            </Button>
          ):(
            <Button disabled={!valid} size="small" className={classes.button} onClick={handleNext}>
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
      {/* </Paper> */}
    </form>
  );
}