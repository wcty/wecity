import React, { useState, useRef, useEffect, Suspense } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Paper, Typography, Fab, Card, CardActionArea, CardMedia, CardContent, CardActions, IconButton, Box, List, ListItem, ListItemText, Button, Radio, RadioGroup, FormControlLabel, FormControl, FormLabel, TextField, InputAdornment, Checkbox } from '@material-ui/core'
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
import { getFeatures, DeleteObject } from 'global/Misc'
import firebase from 'firebase'
import useMeasure from 'use-measure'
import FormExpanded from 'global/FormExpanded'
import createProjectForm from 'global/forms/createProjectForm'
import CreateProject from 'components/Projects/CreateProject'
import ProjectLibrary from 'components/Projects/ProjectLibrary'
import BackFab from 'components/Projects/BackFab'
import moment from 'moment'
import { Route, useRouteMatch, useParams } from 'react-router-dom'
import {Helmet} from "react-helmet"

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
  info: {
    padding: theme.spacing(2),
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
    //height:'100%',
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
        <Button size="small" variant="contained" color="primary" style={{color: "black"}} 
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

function SelectRole() {
  const [value, setValue] = useState({type:'donate'});
  const [periodic, setPeriodic] = useState(false);
  const [sum, setSum] = useState(200);
  const [job, setJob] = useState(2)
  // const [joining, setJoining] = useRecoilState(Atoms.joiningAtom)
  const [selectType, setSelectType] = useRecoilState(Atoms.selectType)
  const [joining, setJoining] = useRecoilState(Atoms.joiningAtom)

  const classes = useStyles()
  const handleChange = (event) => {
    setValue({type: event.target.value});
  };
  useEffect(()=>console.log(selectType),[selectType])

  return (<>
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
              console.log(e.target.value)
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
        variant="contained"  
        color="primary"
        style={{marginTop: '1rem', color: 'black'}}
        onClick={async ()=>{    
          setJoining(false)
      }}>
        Назад
      </Button>
      <Button 
        size="small" 
        variant="contained"  
        color="secondary"
        style={{marginTop: '1rem', float: 'right'}}
        onClick={async ()=>{    
          console.log('Приєднатися')
          //setJoining(true)
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

export default ({ mapRef, loaded, id })=> {
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
  const images = useStorage().ref().child('initiatives')
  const theme = useTheme()
  let match = useRouteMatch()
  let { initiativeID } = useParams();
  //const in = markers.features.find(f=>f.properties.id==id).properties
  useEffect(()=>{

    if(markers && initiativeID){
      const selectedInitiative = markers.features.find(f=>f.properties.id==initiativeID)
      if(selectedInitiative){
        setSelected(initiativeID);
        setInitiative( selectedInitiative.properties )
      }
    }
    console.log(match)
    console.log(initiativeID)
  },[markers, initiativeID, setInitiative])

  useEffect(()=>{
    if(selected && !initiative){
      console.log('setInitiative')
      setInitiative(markers.features.find(f=>f.properties.id==id).properties)
    }
  },[selected, initiative, id])
  useEffect(async()=>{
    if(loaded&&initiative){
      const map = mapRef.current.getMap()
      const center = Object.values(initiative.coordinates)
      const w = mapDimensions.width/2
      const h = (mapDimensions.height - 350)/2
      const offPoint = Object.values(map.unproject([w,h]))
      const point = Object.values(map.getCenter())
      const dist = distance(point, offPoint)
      const newOffPoint = translate({
        type:"FeatureCollection",
        features:[
          {
            type: "Feature",
            geometry:{
              type: "Point",
              coordinates: center
            }
          }
        ]
      }, dist, 180)
      console.log(newOffPoint.features[0].geometry.coordinates)
      newOffPoint.features[0].geometry.coordinates && map.flyTo({ center: newOffPoint.features[0].geometry.coordinates });
    }
  }, [mapRef, loaded, initiative])



  useEffect(async()=>{
    if(selected) {
      setExpanded(false)
      console.log(markers.features)

      setInitiative(markers.features.find(f=>f.properties.id==selected?selected:null).properties)
      setIsCreating(false)
      setMarker(null)
      setJoining(false)
    }
  }, [selected])

  return (<>
    {isViewerOpen && (
      <>
    <IconButton 
      aria-label="return"
      style={{position:"absolute", zIndex: 1000, right:"1.5rem", top:"0.5rem"}}
      onClick={()=>{
        setIsViewerOpen(false)
      }}
    >
      <Close  color="primary" />
    </IconButton>
    <ImageViewer
      src={ [initiative.imageURL.l] }
      currentIndex={ 0 }
      onClose={ ()=>{ setIsViewerOpen(false) } }
      zIndex={300}
      style={{zIndex:300}}
    />
    </>
    )}
    { selected && initiative && !isViewerOpen && (
        <Paper 
          className={classes.paper} 
          style={{
            transition: 'all 0.3s',
            cursor: 'pointer', 
            borderRadius: expanded?'0':"5px",
            overflowY: expanded?'scroll':'hidden',
            minHeight: expanded?`calc(100% - ${bar.height}px)`:'250px',
            maxHeight: expanded?`calc(100% - ${bar.height}px)`:'400px',
            width: expanded?'100%':'calc( 100% - 2rem )',
            bottom: expanded?'0':"1rem",
            right: expanded?'0':"1rem",
            willChange: 'height, min-height, width, bottom, right'  
          }}
        >
          <div id="wrapper">
          <Helmet>
            <title>{"We.city: "+initiative.name}</title>
            <meta property="og:title" content={initiative.name} />
            <meta property="og:site_name" content="We.city" />
            <meta property="og:description" content={initiative.problem} />
            <meta property="og:url" content={"https://weee.city/initiative/"+initiative.id} />
            <meta property="og:image" content={initiative.imageURL?initiative.imageURL.l: addImage} />
          </Helmet>
          <IconButton 
            aria-label="return"
            style={{position:"absolute", right:"1rem", top:"0.5rem", zIndex: 30}}
            onClick={()=>{
              setSelected(null)
              setExpanded(false)
              setJoining(false)
            }}
          >
            <Close  color="primary" />
          </IconButton>

          {/* Header Image */}
          <section 
            className={classes.img} 
            alt="Cover of the initiative"
            onClick={()=>{
              console.log('clicked on img')
              if(expanded&&selected){
                setIsViewerOpen(true)
              }else{
                setExpanded(true)
              }
            }}
            style={{
              position:'relative',
              backgroundImage: `url(${initiative.imageURL?initiative.imageURL.s: addImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
              borderTopLeftRadius: expanded?0:"5px",
              borderTopRightRadius: expanded?0:"5px"         
          }}>
          </section>

          {/* Actual Initiative */}
          <Box className={classes.info} 
            style={{position:'relative'}}
            onClick={()=>{
              console.log('clicked on card')
              setExpanded(!expanded)
            }}>
            {location && initiative.coordinates && (
            <span className={classes.span}>
              <LocationOn style={{fontSize: 'large'}} />
              {
                (distance([location.longitude, location.latitude], Object.values(initiative.coordinates)))<1 ? 
                (distance([location.longitude, location.latitude], Object.values(initiative.coordinates))*1000).toFixed(0) +"м від мене":
                ((distance([location.longitude, location.latitude], Object.values(initiative.coordinates)))<10 ? 
                (distance([location.longitude, location.latitude], Object.values(initiative.coordinates))).toFixed(1) +"км від мене":
                (distance([location.longitude, location.latitude], Object.values(initiative.coordinates))).toFixed(0) +"км від мене")
              } 
            </span>)}
            {/* <span style={{float:'right'}}> <ExpandLess /></span> */}
            <span style={{marginLeft: location?"2rem":undefined}}>
              <People style={{fontSize: 'large'}} /> 
              {initiative.members?initiative.members.ids.length:0}
            </span>
            <Typography variant="h6">
              {initiative.name? initiative.name: "Name is not set"}
            </Typography>
            <IconButton 
              aria-label="return"
              style={{
                position:"absolute", right:'2rem', top:"0rem",
                transitionDuration: '0.3s', transform: expanded?'rotate(180deg)':'rotate(0deg)'
              }}
              onClick={()=>{
                setExpanded(!expanded)
              }}
            >
              <ExpandLess />
            </IconButton>

            {/* Expanded view additions*/}

          </Box>

          {/* Content */}
          
            { expanded && !joining && <Box style={{padding: '2rem', paddingTop: 0}}><List key='elements' disablePadding>
              {initiative.problem&& (<ListItem className={classes.item} disableGutters>
                <ListItemText
                  primary="Проблема або ідея:"
                  secondary={initiative.problem}
                />
              </ListItem>)}
              {initiative.outcome&& (<ListItem className={classes.item} disableGutters>
                <ListItemText
                  primary="Мета:"
                  secondary={initiative.outcome}
                />
              </ListItem>)}
              {initiative.context && (<ListItem className={classes.item} disableGutters>
                <ListItemText
                  primary="Передумови:"
                  secondary={initiative.context}
                />
              </ListItem>)}
              {initiative.timestamp && (<ListItem className={classes.item} disableGutters>
                <ListItemText
                  primary="Додано:"
                  secondary={moment(initiative.timestamp.toDate()).format('DD.MM.YYYY')}
                />
              </ListItem>)}
            </List>
            { user && !initiative.members[user.uid] && <Button 
              size="small" 
              variant="contained"  
              color="secondary"
              style={{marginTop: '1rem'}}
              onClick={async ()=>{    
                console.log('Приєднатися')
                setJoining(true)
            }}>
              Приєднатися
            </Button>}
            { user && initiative.members[user.uid] && initiative.members.ids.length<2 && <Button 
              size="small" 
              variant="contained"  
              color="secondary"
              style={{marginTop: '1rem'}}//
              onClick={()=>DeleteObject(initiative, initiatives, images, 'markers', ()=>{setMarkers({type: "FeatureCollection", features: markers.features.filter(m=>m.properties.id!==initiative.id)}); setInitiative(null);})}
            >
              Видалити
            </Button>}
            </Box> }

            <Suspense fallback={null}>
            { expanded && joining && <Box style={{padding: '2rem', paddingTop:0}}>
              <SelectRole />
            </Box>}
            </Suspense>
          
          </div>
        </Paper>
    )
  }</>)
}