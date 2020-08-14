import React, { useState, useEffect, Suspense } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, Fab, Grow, List, ListItem, ListItemText, Button } from '@material-ui/core';
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil';
import { creatingAtom, markerAtom , barAtom, markersAtom, selectedAtom, locationAtom, mapAtom } from 'global/Atoms'
import { useStorage, useStorageDownloadURL, useFirestore, useUser } from 'reactfire';
import { People, LocationOn, ExpandLess, Star, StarBorder } from '@material-ui/icons'
import distance from '@turf/distance'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 999,
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
    height: '252px',
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

export default ({ project })=> {
  const classes = useStyles();
  const theme = useTheme();
  const [marker, setMarker] = useRecoilState(markerAtom)
  const [markers, setMarkers] = useRecoilState(markersAtom)
  const [imageLoadedURL, setImageLoadedURL] = useState(null)
  const projects = useFirestore().collection('markers')
  const [location, setLocation] = useRecoilState(locationAtom)
  const map = useRecoilValue(mapAtom)
  const bar = useRecoilValue(barAtom)
  const user = useUser()


  return (<>
    { (
      <form className={classes.root} noValidate autoComplete="off"
        style={{
          height: `calc(100% - ${bar.height}px)`, 
          width: '100%',
          bottom: '0',
          right: '0',
        }} 
      >
        <Paper elevation={1} className={classes.paper} 
          style={{
            cursor: 'pointer', 
            borderRadius: '0',
            overflowY: 'scroll'
          }}
        > 
          <div id="wrapper">
          <section 
            className={classes.img} 
            alt="Cover of the project"
            onClick={()=>{
              console.log('clicked on img')
            }}
            style={{
              backgroundImage: `url(${project.imageURL?project.imageURL.s: addImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
          }}>
          </section>

            <Typography variant="h6" style={{marginLeft:'1rem', marginTop:'1rem'}}>
              {project.name? project.name: "Name is not set"}
            </Typography>
            
              <List>
                {project.problem&& (<ListItem>
                  <ListItemText
                    primary="Проблематика"
                    secondary={project.problem}
                  />
                </ListItem>)}
                {project.timestamp && (<ListItem>
                  <ListItemText
                    primary="Додано:"
                    secondary={project.timestamp.toDate().getDay()+"."+project.timestamp.toDate().getMonth()+"."+project.timestamp.toDate().getFullYear()}
                  />
                </ListItem>)}
              </List>
          </div>
          <Suspense fallback={null}>
          
            <Button 
              elevation={15} 
              variant="contained" 
              style={{zIndex: 200, marginLeft:"1rem",marginBottom:"1rem", color:'white',backgroundColor:'grey'}} 
              onClick={()=>{
                console.log('button')
              }}
            >
              Додати проект в ініціативу
            </Button>
          
          </Suspense>
        </Paper>
    </form>
    )
  }</>)
}