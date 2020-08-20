import React, { useState, useEffect, Suspense } from 'react'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import { Paper, Typography, Fab, IconButton, Box, List, ListItem, ListItemText, Button } from '@material-ui/core'
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil'
import { creatingAtom, markerAtom, joiningAtom, markersAtom, barAtom,  selectedAtom, locationAtom, mapAtom } from 'global/Atoms'
import { useStorage, useStorageDownloadURL, useFirestore, useUser } from 'reactfire'
import { People, LocationOn, ExpandLess, Star, StarBorder, Close } from '@material-ui/icons'
import distance from '@turf/distance'
import translate from '@turf/transform-translate'
import { render } from 'react-dom'
import ImageViewer from 'react-simple-image-viewer'
import { useGeoFirestore } from 'global/Hooks'
import JoinInitiative from './JoinInitiative'
import { getFeatures } from 'global/Misc'
import firebase from 'firebase'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 10,
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
    overflowX: "hidden"
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

export default ({ mapRef, loaded, getMarker })=> {
  const classes = useStyles();
  const [marker, setMarker] = useRecoilState(markerAtom)
  const initiatives = useFirestore().collection('markers')
  const [initiative, setInitiative] = useState(null)
  const [selected, setSelected] = useRecoilState(selectedAtom)
  const [isCreating, setIsCreating] = useRecoilState(creatingAtom)
  const [location, setLocation] = useRecoilState(locationAtom)
  const [expanded, setExpanded] = useState(false)
  const mapDimensions = useRecoilValue(mapAtom)
  const bar = useRecoilValue(barAtom)
  const user = useUser()
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const markersCollection = useGeoFirestore().collection('markers')
  const [markers, setMarkers] = useRecoilState(markersAtom)
  const [joining, setJoining] = useRecoilState(joiningAtom)
  const images = useStorage().ref().child('initiatives')

  useEffect(()=>{
    setExpanded(false)
  },[selected])

  useEffect(async()=>{
    if(loaded&&initiative){
      const map = mapRef.current.getMap()
      const center = Object.values(initiative.coordinates)
      const w = mapDimensions.width/2
      const h = (mapDimensions.height - 350)/2
      const offPoint = Object.values(map.unproject([w,h]))
      const point = Object.values(map.getCenter())
      const dist = distance(point, offPoint)
      console.log(dist)
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

  useEffect(()=>{
    if(loaded&&isCreating&&location){
      const map = mapRef.current.getMap()
      const w = mapDimensions.width/2
      const h = (mapDimensions.height - 350)/2
      const offPoint = Object.values(map.unproject([w,h]))
      const point = Object.values(map.getCenter())
      const dist = distance(point, offPoint)
      const center = [location.longitude, location.latitude]
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
      map.flyTo({ center: newOffPoint.features[0].geometry.coordinates });
    }
  }, [mapRef, loaded, isCreating])

  useEffect(()=>{
    if(selected) {
      const initiativeRef = initiatives.doc(selected)
      const initiative = initiativeRef.get().then((doc)=>{
        if (doc.exists){
          console.log(document)
          const data = doc.data()
          //data.id = doc.id
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

  useEffect(()=>{
    initiative&& user&&console.log(initiative.members, user.uid)
  },[initiative, user])

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
      <form className={classes.root} noValidate autoComplete="off"
        style={{
          height: expanded?`calc(100% - ${bar.height}px)`:"250px", 
          width: expanded?'100%':'calc( 100% - 2rem )',
          bottom: expanded?'0':"1rem",
          right: expanded?'0':"1rem",
          willChange: 'height, width, bottom, right'
        }} 
      >
        <Paper elevation={1} className={classes.paper} 
          style={{
            cursor: 'pointer', 
            borderRadius: expanded?'0':"5px",
            overflowY: expanded?'scroll':'hidden' 
          }}
        > 
          <div id="wrapper">
          <IconButton 
            aria-label="return"
            style={{position:"absolute", right:"1rem", top:"0.5rem", zIndex: 30}}
            onClick={()=>{
              setSelected(null)
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
            <span style={{float:'right'}}> <ExpandLess /></span>
            <span style={{marginLeft: location?"2rem":undefined}}>
              <People style={{fontSize: 'large'}} /> 
              {initiative.members?initiative.members.length:0}
            </span>
            <Typography variant="h6">
              {initiative.name? initiative.name: "Name is not set"}
            </Typography>
            <IconButton 
              aria-label="return"
              style={{
                position:"absolute", right:"3rem", top:"0rem",
                transitionDuration: '0.3s', transform: expanded?'rotate(180deg)':'rotate(0deg)'
              }}
              onClick={()=>{
                setExpanded(!expanded)
              }}
            >
              <ExpandLess />
            </IconButton>

            {/* Expanded view additions*/}
            {expanded && (<>
              <List style={{paddingRight:'0.5rem', paddingLeft: '0.5rem'}}>
                {initiative.problem&& (<ListItem>
                  <ListItemText
                    primary="Проблема або ідея:"
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
          </Box>
         
          {/* Buttons Delete & Join */}
          <Suspense fallback={null}>
          {expanded && (
            initiative.members.find(m=>m==(user?user.uid:null)) ? (

              //Delete Initiative Button
              initiative.members.length<2 ? 
                (<>
                  <Typography style={{marginLeft:'2rem', marginBottom:'2rem'}}>Ви щойно створили цю ініціативу!</Typography>
                  <Button 
                    elevation={15} 
                    variant="contained" 
                    color="secondary"
                    style={{
                      zIndex: 200, 
                      marginLeft:"1rem",
                      marginBottom:"1rem", 
                      color:'white',
                      //backgroundColor:'grey'
                    }} 
                    onClick={async ()=>{
                      console.log(initiative.id)
                      if(initiative.id){
                        initiatives.doc(initiative.id).delete().then(function() {
                          console.log("Document successfully deleted!", initiative, markers); 

                          Object.values(initiative.imageURL).forEach((url)=>{
                            const fileName = url.split('?')[0].split('initiatives%2F').reverse()[0]
                            console.log(url, fileName)
                            images.child(fileName).delete().then(function() {
                              // File deleted successfully
                              console.log('deleted')
                            }).catch(function(error) {

                              console.log('error', error)
                              // Uh-oh, an error occurred! 
                              //2F9bf775f0-e2dc-11ea-b526-a1336af6d30a_180x180.jpg
                            });

                          })
                          setSelected(null)
                          console.log(markers)
                          setMarkers({type:"FeatureCollection", features: markers.features.filter(f=>f.properties.id!=initiative.id) })

                        }).catch(function(error) {
                            console.error("Error removing document: ", error);
                        });
                      }else{console.log(initiative)}
                    }}
                  >
                    Видалити
                  </Button>
                </>):
                <Typography style={{marginLeft:'2rem', marginBottom:'2rem'}}>Ви вже долучилися до цієї ініціативи!</Typography>
            ):
            
            //Joining Initiative Button
            (
            <Button 
              elevation={15} 
              variant="contained" 
              style={{zIndex: 200, marginLeft:"1rem",marginBottom:"1rem", color:'white',backgroundColor:'grey'}} 
              onClick={()=>{
                console.log('button')
                setJoining(true)
              }}
            >
              Приєднатися
            </Button>)
          )}
          </Suspense>
          
          </div>
        </Paper>
    </form>
    )
  }</>)
}