import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import {  Typography, Card, CardActionArea, CardMedia, CardContent, CardActions, IconButton, Box, List, ListItem, ListItemText, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, InputAdornment, Checkbox } from '@material-ui/core'
import { useRecoilState, useRecoilValue } from 'recoil'
import * as Atoms from 'global/Atoms'
import { useStorage, useStorageDownloadURL, useFirestore, useUser } from 'reactfire'
import { DeleteObject } from 'global/Misc'
import CreateProject from 'components/Projects/CreateProject'
import ProjectLibrary from 'components/Projects/ProjectLibrary'
import BackFab from 'components/Projects/BackFab'
import { useParams, Redirect } from 'react-router-dom'

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

  input: {
    display: 'none',
  },
  info: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    //height:'100%',
  },
  selectButton: {
    width: 'calc( 50% - 0.75rem )',
    height: '4rem',
    color: 'black',
    marginRight: '0.5rem',
    marginTop: '0.5rem'
  },
  selectGroup:{
    marginTop: '1rem',
    transitionDuration: '0.3s',
    
    //transition: 'width 2s'
  },
  alert: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    zIndex: 999,
    maxWidth: 'calc( 100% - 4rem )'
  }
}));

function MediaCard({ directory }) {
  const objects = useFirestore().collection(directory)
  const images = useStorage().ref().child(directory)
  const [selectType, setSelectType] = useRecoilState(Atoms.selectType)

  return (
    <Card style={{marginTop: '1rem'}}>
      <CardActionArea>
        <CardMedia
          style={{height: 140}}
          image={selectType.object.imageURL.s}
          title={selectType.object.rendername}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {selectType.object.rendername}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Для реалізаціїї потрібно {selectType.object.volunteers} волонтерів та {selectType.object.price} грн.
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" variant="outlined" color="primary" style={{color: "black"}} 
          onClick={()=>{
            if(selectType.type=='newProject'){
              DeleteObject(selectType.object, objects, images, 'projects', ()=>setSelectType(null))
            }else if(selectType.type=='selectProject'){
              setSelectType(null)
            }
          }}
        >
          {selectType.type=='newProject'?'Видалити':'Очистити'}
        </Button>
      </CardActions>
    </Card>
  );
}

const roleLookup = {
  donate: "Donator",
  volunteer: "Volunteer",
  project: "Contractor",
  resource: "Provider"
}
export default ()=>{
  const [value, setValue] = useState({type:'donate'});
  const [periodic, setPeriodic] = useState(false);
  const [sum, setSum] = useState(200);
  const [job, setJob] = useState()
  // const [joining, setJoining] = useRecoilState(Atoms.joiningAtom)
  const [selectType, setSelectType] = useRecoilState(Atoms.selectType)
  const [joining, setJoining] = useRecoilState(Atoms.joiningAtom)
  const { initiativeID } = useParams()
  const initiativeRef = useFirestore().collection("initiatives").doc( initiativeID )
  const user = useUser()
  const [redirect, setRedirect] = useState()
  useEffect(()=>{
    if(redirect){
      setRedirect(null)
    }
  },[redirect])
  const classes = useStyles()
  const handleChange = (event) => {
    setValue({type: event.target.value});
  };
  useEffect(()=>console.log(selectType),[selectType])

  return (<>
    {redirect && <Redirect to={redirect} />}
    <FormControl component="fieldset" style={{display: (!selectType || selectType.object ) ? 'block': 'none'}}>
      <Typography variant="subtitle2">Приєднатися до ініціативи</Typography>
      <RadioGroup aria-label="gender" name="gender1" value={value.type} onChange={handleChange}>
        <Box id='donate' className={classes.selectGroup}>
          <FormControlLabel value="donate" control={<Radio />} label="Я готова/ий пожертвувати гроші" />
          {value.type=="donate" && <><TextField 
            key='donate'
            id='donate'
            label='Сума'
            InputProps={{
              endAdornment:<InputAdornment position="end">грн</InputAdornment>
            }}
            className={classes.text}
            variant="outlined"
            onChange={(e)=>{
              setSum(e.target.value)
              console.log(e.target.value)
            }}
            defaultValue={sum}
          />
          <FormControlLabel
            control={<Checkbox checked={periodic} onChange={(e)=>setPeriodic(!periodic)} name="periodic" />}
            label="Щомісячний платіж?"
            style={{marginLeft: '0.5rem'}}
          /></>}
        </Box>
        <Box id='volunteer'className={classes.selectGroup} >
          <FormControlLabel value="volunteer" control={<Radio />} label="Я готова/ий бути волонтером" />
          {value.type=="volunteer" && <TextField 
            key='volunteer'
            id='volunteer'
            label='Яку роботу ви можете виконувати?'
            className={classes.text}
            variant="outlined"
            onChange={(e)=>{
              setJob(e.target.value)
              // console.log(e.target.value)
            }}
            variant="outlined"
            multiline={true}
            rows={2}
            inputProps={{
              maxLength: 200
            }}
          />}
        </Box>
        <Box id='project' className={classes.selectGroup}>
          <FormControlLabel value="project" control={<Radio />} label="Я готова/ий запропонувати проектне рішення" />
          {value.type=="project" && <div style={{paddingLeft: '1rem', justifyContent: 'space-between'}}>
            {!selectType && <>
              <Button 
                disabled
                size="small" 
                variant="outlined"  
                className={classes.selectButton}
                onClick={async ()=>{    
                  console.log('selectProject')
                  setSelectType({type: 'selectProject'})
              }}>
                Обрати з бібліотеки
              </Button>
              <Button 
                disabled
                size="small" 
                variant="outlined" 
                className={classes.selectButton}
                onClick={async ()=>{    
                  console.log('newProject')
                  setSelectType({type: 'newProject'})
              }}>
                Створити нове
              </Button>
            </>}
            {selectType && selectType.object && <>
              <MediaCard directory={"projects"} />
            </>}
          </div>}
        </Box>
        <Box id='resource' className={classes.selectGroup}>
          <FormControlLabel value="resource" control={<Radio />} label="Я готова/ий надати матеріали або послуги" />
          {value.type=="resource" && <div style={{paddingLeft: '1rem', justifyContent: 'space-between'}} >
            <Button 
              disabled
              size="small" 
              variant="outlined"  
              className={classes.selectButton}
              onClick={async ()=>{    
                console.log('selectResource')
                setSelectType({type: 'selectResource'})

            }}>
              Обрати з бібліотеки
            </Button>
            <Button 
              disabled
              size="small" 
              variant="outlined"  
              className={classes.selectButton}
              onClick={async ()=>{    
                console.log('newResource')
                setSelectType({type: 'newResource'})
            }}>
              Створити новий/у
            </Button>
          </div>}
        </Box>
      </RadioGroup>
      <Button 
        size="small" 
        variant="outlined"  
        color="primary"
        style={{marginTop: '1rem', color: 'black'}}
        onClick={async ()=>{    
          setJoining(false)
      }}>
        Назад
      </Button>
      <Button 
        disabled={value.type=="project"||value.type=="resource"||(value.type=="donate"&&sum<50)||(value.type=="volunteer" && (!job || job.length<5) )}
        size="small" 
        variant="contained"  
        color="secondary"
        style={{marginTop: '1rem', float: 'right'}}
        onClick={async ()=>{    
          console.log('Приєднатися')
          initiativeRef.set({ 
            members: {[user.uid]:{ 
              role: roleLookup[value.type], 
              name: user.displayName,
              avatar: user.photoURL,
              info: {
              ...(value.type=="donate" && {sum, periodic}),
              ...(value.type=="volunteer" && {job}),
            } }, ids:[user.uid]},
            projects: {},
            resources: {
              ...(value.type=="donate" && {finance: {[user.uid]:{sum, periodic}}}),
              ...(value.type=="volunteer" && {volunteers: {[user.uid]:{job}}}),
            },
          }, {merge: true})
          setRedirect(`/initiative/${ initiativeID }`)
          setJoining(false)
      }}>
        Приєднатися
      </Button>
    </FormControl>
    {selectType && !selectType.object && <>
      {selectType.type=="selectProject" && !selectType.object && <>
        <ProjectLibrary onlyMine 
          select={(project)=>setSelectType({type: "selectProject", object: project })} 
        />
        <BackFab back={()=>setSelectType(null)}/>
      </>}
      {selectType.type=="newProject" && !selectType.object && <>
        <CreateProject 
          submit={(docRef, doc)=>setSelectType({type: "newProject", object: {...doc.data(), id: docRef.id} })} 
          cancel={()=>setSelectType(null)}
        />
      </>}
      {selectType.type=="selectResource" && !selectType.object && <>
        <CreateProject />
      </>}
      {selectType.type=="newResource" && !selectType.object && <>
        <CreateProject />
      </>} 
    </>}
  </>);
}
