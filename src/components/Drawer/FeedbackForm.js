import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, FormControl, IconButton, InputLabel, Select, MenuItem, Typography, TextField, Button, MobileStepper, Box } from '@material-ui/core';
import { KeyboardArrowLeft, KeyboardArrowRight, Close } from '@material-ui/icons';
import { useUser, useFirestore } from 'reactfire';
import { Redirect, useHistory } from 'react-router-dom'
import { useI18n } from 'global/Hooks'

//1920x1080,851x315,484x252,180x180

const feedbackForm = (i18n)=>[
  [
    {
      type: "text",
      id: "name",
      label: i18n('feedbackName'),
      maxLength: 50
    },
    {
      type: "text",
      id: "reachout",
      label: i18n('feedbackMessage'),
      rows: 8,
      maxLength: 600
    },
    {
      type: "text",
      id: "contact",
      label: i18n('feedbackContact'),
      rows: 8,
      maxLength: 600
    },
    
  ],
]

const useStyles = makeStyles((theme) => ({
  root: {
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
  },
  paper:{
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
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

export default ()=> {
  const classes = useStyles();
  const theme = useTheme();
  const i18n = useI18n()
  const formSteps = feedbackForm(i18n)
  const [activeStep, setActiveStep] = useState(0);
  const maxSteps = formSteps.length;
  const [resource, setResource] = useState(null)
  const [imageLoadedURL] = useState(null)
  const [valid, setValid] = useState(false)
  const history = useHistory()

  useEffect(()=>{
    let bool = true
    if(resource){
      formSteps[activeStep].forEach((d,i)=>{
        if(d.type==='image'){
          if(!(imageLoadedURL)) bool = false
        }else if(d.type!=='note'){
          if(!(resource[d.id]&&resource[d.id].length>0)) bool = false
        }
      })
      setValid(bool)
    }
    console.log(bool)
  },  [activeStep, resource, imageLoadedURL, formSteps])

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const feedbackRef = useFirestore().collection('feedback')
  const user = useUser()

  return (<Box style={{
    backgroundColor:'white',
    position: 'fixed',
    flexGrow: 1,
    top: 0, left: 0, bottom: 0, right: 0,
    zIndex: 999,
    overflowY: "auto",  
  }}>
    <form className={classes.root} noValidate autoComplete="off" style={{textAlign:'start', padding:'1rem', margin:'auto'}} >
      <Paper elevation={1} className={classes.paper} style={{paddingTop:'2rem', paddingBottom:'1rem', position:'relative'}} >  
        <Typography variant="h6" style={{textAlign:'start', margin:'1rem'}}>
          {i18n('feedbackGreeting')}
        </Typography>
        <Typography variant="body1" component="div" style={{textAlign:'start', margin:'1.2rem'}}>
          {i18n('feedbackDescription')}
        </Typography>
    {user.isAnonymous && (
      <IconButton 
        aria-label="return"
        style={{position:"absolute", display:'block', right:"1.5rem", bottom:"0.5rem"}}
        onClick={()=>{
          history.push('/')
        }}
      >
        <Close />
      </IconButton>
    )}
    {!user.isAnonymous && <>  
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

                if(feedbackRef) {
                  const message = {
                    to: ['hi@weee.city'],
                    message: {
                      subject: `${i18n('feedbackEmailTitle')} ${resource.name}`,
                      text: `
                        ${i18n('feedbackEmailName')}: ${resource.name}.
                        ${i18n('feedbackEmailMessage')}: ${resource.reachout}.
                        ${i18n('feedbackEmailContact')}: ${resource.contact}.
                      `
                    }
                  }

                  feedbackRef.add(message)
                    .then(function() {
                        console.log("Document successfully written!");
                    })
                    .catch(function(error) {
                        console.error("Error writing document: ", error);
                    });
                  }
                  history.push('/')
              }}>
                {i18n('send')}
              </Button>
            ):(
              <Button disabled={!valid} size="small" className={classes.button} onClick={handleNext}>
                {i18n('next')}
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
              </Button>
            )
          }
          backButton={
            activeStep === 0 ? (
              <Button className={classes.button} variant="contained" size="small" onClick={()=>{
                history.push('/')
              }} >
                {i18n('cancel')}
              </Button>
            ):(
              <Button size="small" className={classes.button} onClick={handleBack} >
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
                {i18n('send')}
              </Button>
            )
          }
        />
        </>}
      </Paper>
    </form>
    </Box>
  );
}