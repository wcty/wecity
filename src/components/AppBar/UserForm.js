import React, { useState, useEffect, useMemo, useRef } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, FormControl, InputLabel, Select, MenuItem, Typography, TextField, Button, MobileStepper, InputBase, CircularProgress, Box } from '@material-ui/core';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil';
import { creatingAtom, userAtom, locationAtom, mapAtom } from 'global/Atoms'
import { useStorage, useUser, useFirestore, useFirestoreDocOnce } from 'reactfire';
import { v1 as uuidv1 } from 'uuid';
import { useGeoFirestore } from 'global/Hooks'
import * as firebase from 'firebase/app';
import { getFeatures } from 'global/Misc'
import ErrorBoundary from 'global/ErrorBoundary'
import { useI18n } from 'global/Hooks'

//1920x1080,851x315,484x252,180x180

const userForm =(i18n)=>[
  [

    {
      type: "text",
      id: "name",
      label: i18n('userFormName'),
      maxLength: 50
    },
    {
      type: "text",
      id: "reachout",
      label: i18n('userFormHowDidYouFindUs'),
      rows: 4,
      maxLength: 300
    },
    {
      type: "text",
      id: "contact",
      label: i18n('userFormHowToContactYou'),
      rows: 4,
      maxLength: 300
    },
    
  ],
]

const useStyles = makeStyles((theme) => ({
  root: {
    // position: 'fixed',
    // flexGrow: 1,
    // top: 0, left: 0, bottom: 0, right: 0,
    // zIndex: 999,
    // overflowY: "auto",
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
  },
  paper:{
    // margin: 'auto',
    // top: 0, left: 0, bottom: 0, right: 0,
    // position: 'relative',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
    // position: 'relative',
  },

  MobileStepper:{
    background: "none",
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

export default ({ isCreating, setIsCreating, setContactData })=> {
  const classes = useStyles();
  const theme = useTheme();
  const i18n = useI18n()
  const formSteps = userForm(i18n)
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = formSteps.length;
  const [resource, setResource] = useState(null)
  const [uuid, setUuid] = useState(uuidv1())
  const imageRef = useStorage().ref().child('resources')

  const [imageLoadedURL, setImageLoadedURL] = useState(null)

  const resourcesCollection = useGeoFirestore().collection('resources')
  const user = useUser()
  const [finished, setFinished] = useState(null)
  const [location, setLocation] = useRecoilState(locationAtom)
  const [valid, setValid] = useState(false)

  useEffect(async()=>{
    let bool = true
    if(resource){
      formSteps[activeStep].forEach((d,i)=>{
        if(d.type=='image'){
          if(!(imageLoadedURL)) bool = false
        }else if(d.type!='note'){
          if(!(resource[d.id]&&resource[d.id].length>0)) bool = false
        }
      })
      setValid(bool)
    }
    console.log(bool)
  },  [activeStep, resource, imageLoadedURL])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const users = useFirestore().collection('users').doc(isCreating)


  return !finished && (
    <form className={classes.root} noValidate autoComplete="off" style={{textAlign:'start', padding:'1rem', margin:'auto'}} >
      <Paper elevation={1} className={classes.paper} style={{paddingTop:'2rem'}} > 
      
      <Typography variant="h6" style={{textAlign:'start', margin:'1rem'}}>
        {i18n('userFormName')}
      </Typography>
      <Typography variant="body1" style={{textAlign:'start', margin:'1.2rem'}}>
        {i18n('userFormDescription')}
      </Typography>

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
                    setResource(Object.assign(resource?Object.assign({}, resource):{}, { [input.id]: e.target.value }))
                  }}
                  defaultValue={resource && resource[input.id]?resource[input.id]:""}
                  helperText={`${resource && resource[input.id]?resource[input.id].length:0}/${input.maxLength}`}
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
                    value={resource && resource[input.id]?resource[input.id]:""}
                    onChange={(e)=>{
                      setResource(Object.assign(resource?Object.assign({}, resource):{}, { [input.id]: e.target.value }))
                    }}
                    label={input.label}
                  >
                    {input.options.map(opt=><MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
                  </Select>
                </FormControl>
              )
            default:
              return null;
          }
        })
      }    

      <MobileStepper
        steps={maxSteps}
        position={"static"}

        variant="text"
        activeStep={activeStep}
        className={classes.MobileStepper}
        nextButton={
          activeStep === (maxSteps - 1) ? (
            <Button disabled={!valid} className={classes.button} variant="contained" size="small" onClick={async ()=>{    
              setContactData({...resource, id:isCreating})
              if(users) {
                users.set({...resource, id:isCreating})
                  .then(function() {
                      console.log("Document successfully written!");
                  })
                  .catch(function(error) {
                      console.error("Error writing document: ", error);
                  });
                }
              setIsCreating(false)
            }}>
              Надіслати
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
              setContactData({contact:'No response', id:isCreating})
              setIsCreating(false)

            }} >
              Не відповідати
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