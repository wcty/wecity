import React, { Suspense, useState } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, IconButton, Chip, List, ListItem, ListItemText, Button } from '@material-ui/core';
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil';
import { barAtom, markersAtom, selectedAtom, locationAtom, mapAtom } from 'global/Atoms'
import { useFirestore, useUser } from 'reactfire';
import { Close } from '@material-ui/icons'
import { render } from 'react-dom';
import ImageViewer from 'react-simple-image-viewer';

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

export default ({ resource, setResource })=> {
  const classes = useStyles();
  const theme = useTheme();
  const resources = useFirestore().collection('initiatives')
  const [location, setLocation] = useRecoilState(locationAtom)
  const map = useRecoilValue(mapAtom)
  const bar = useRecoilValue(barAtom)
  const user = useUser()
  const [isViewerOpen, setIsViewerOpen] = useState(false);

  return (<>
    {isViewerOpen && (<>
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
          src={ [resource.imageURL.l] }
          currentIndex={ 0 }
          onClose={ ()=>{ setIsViewerOpen(false) } }
          zIndex={300}
          style={{zIndex:300}}
        />
        </>
    )}
    { (
      <form className={classes.root} noValidate autoComplete="off"
        style={{
          height: `calc(100% - ${bar.height}px)`, 
          width: '100%',
          bottom: '0',
          right: '0',
          visibility: isViewerOpen?'hidden':'visible'
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
            alt="Cover of the resource"
            onClick={()=>{
              setIsViewerOpen(true)
            }}
            style={{
              position:'relative',
              backgroundImage: `url(${resource.imageURL?resource.imageURL.s: addImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
          }}>
            <IconButton 
              aria-label="return"
              style={{position:"absolute", right:"1.5rem", top:"0.5rem"}}
              onClick={()=>{
                setResource(null)
              }}
            >
              <Close  color="primary" />
            </IconButton>
          </section>
            {resource.category && (<Chip label={resource.category} style={{marginLeft: '1rem', marginTop: '-5rem'}} />)}
            <Typography variant="h6" style={{marginLeft:'1rem', marginTop:'0rem'}}>
              {resource.shortDescription? resource.shortDescription: "Description is not set"}
            </Typography>
              <List>
                {resource.location&& (<ListItem>
                  <ListItemText
                    primary="Розташування:"
                    secondary={resource.location}
                  />
                </ListItem>)}
                {resource.description&& (<ListItem>
                  <ListItemText
                    primary="Розгорнутий опис:"
                    secondary={resource.description}
                  />
                </ListItem>)}
                {resource.condition&& (<ListItem>
                  <ListItemText
                    primary="В якому стані:"
                    secondary={resource.condition}
                  />
                </ListItem>)}
                {resource.description&& (<ListItem>
                  <ListItemText
                    primary="На яких умовах можна отримати:"
                    secondary={resource.description}
                  />
                </ListItem>)}
                {resource.compensation && (<ListItem>
                  <ListItemText
                    primary="Сума компенсації, якщо потрібна:"
                    secondary={resource.compensation}
                  />
                </ListItem>)}
                {resource.usability && (<ListItem>
                  <ListItemText
                    primary="Кому він може бути корисним:"
                    secondary={resource.usability}
                  />
                </ListItem>)}
                {resource.exchange && (<ListItem>
                  <ListItemText
                    primary="На шо ви хотіли би його обміняти:"
                    secondary={resource.exchange}
                  />
                </ListItem>)}
              </List>
          </div>
          <Suspense fallback={null}>
          
            { user && <Button 
              elevation={15} 
              variant="contained" 
              style={{zIndex: 200, marginLeft:"1rem",marginBottom:"1rem", color:'white',backgroundColor:'grey'}} 
              onClick={()=>{
                console.log('button')
              }}
            >
              Додати ресурс в ініціативу
            </Button>}
          
          </Suspense>
        </Paper>
    </form>
    )
  }</>)
}