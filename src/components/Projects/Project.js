import React, { useState, useEffect, Suspense } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Typography, IconButton, Chip, List, ListItem, ListItemText, Button } from '@material-ui/core';
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil';
import { creatingAtom, markerAtom , barAtom, markersAtom, selectedAtom, locationAtom, mapAtom } from 'global/Atoms'
import { useStorage, useStorageDownloadURL, useFirestore, useUser } from 'reactfire';
import { Close, ArrowBack } from '@material-ui/icons'
import distance from '@turf/distance'
import { render } from 'react-dom';
import ImageViewer from 'react-simple-image-viewer';
import { categories } from 'global/forms/projectCategories'

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

export default ({ project, setProject })=> {
  const classes = useStyles();
  const bar = useRecoilValue(barAtom)
  const user = useUser()
  const [isViewerOpen, setIsViewerOpen] = useState(false);
  const directory='projects'
  const objects = useFirestore().collection(directory)
  const images = useStorage().ref().child(directory)
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
        src={ [project.imageURL.l] }
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
            alt="Cover of the project"
            onClick={()=>{
              console.log('clicked on img')
              setIsViewerOpen(true)
            }}
            style={{
              position:'relative',
              backgroundImage: `url(${project.imageURL?project.imageURL.s: addImage})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover',
              backgroundRepeat: 'no-repeat',
          }}>          
            <IconButton 
              aria-label="return"
              style={{position:"absolute", display:'block', right:"1.5rem", top:"0.5rem"}}
              onClick={()=>{
                setProject(null)
              }}
            >
              <ArrowBack color="primary"/>
            </IconButton>
          </section>
            {project.category && (<Chip label={categories.find(c=>c.name==project.category).label} style={{marginLeft: '1rem', marginTop: '-5rem', zIndex: 9, position: 'relative'}} />)}
            <Typography variant="h6" style={{marginLeft:'1rem', marginTop:'0rem'}}>
              {project.name? project.name: "Name is not set"}
            </Typography>
              <List>
                {project.contractor&& (<ListItem>
                  <ListItemText
                    primary="Ім'я виконавця:"
                    secondary={project.contractor}
                  />
                </ListItem>)}
                {project.location&& (<ListItem>
                  <ListItemText
                    primary="Місце виробництва:"
                    secondary={project.location}
                  />
                </ListItem>)}
                {project.problem&& (<ListItem>
                  <ListItemText
                    primary="Яку проблему має вирішити:"
                    secondary={project.problem}
                  />
                </ListItem>)}
                {project.description&& (<ListItem>
                  <ListItemText
                    primary="Опис проекту:"
                    secondary={project.description}
                  />
                </ListItem>)}
                {project.experience && (<ListItem>
                  <ListItemText
                    primary="Досвід виконавця:"
                    secondary={project.experience}
                  />
                </ListItem>)}
                {project.resource && (<ListItem>
                  <ListItemText
                    primary="Необхідні ресурси (не грошові):"
                    secondary={project.resource}
                  />
                </ListItem>)}
                {project.volunteers && (<ListItem>
                  <ListItemText
                    primary="Необхідна кількість волонтерів:"
                    secondary={project.volunteers}
                  />
                </ListItem>)}

                {project.volunteersTask && (<ListItem>
                  <ListItemText
                    primary="Задачі волонтерів:"
                    secondary={project.volunteersTask}
                  />
                </ListItem>)}
                {project.price && (<ListItem>
                  <ListItemText
                    primary="Мінімальний необхідний бюджет:"
                    secondary={project.price}
                  />
                </ListItem>)}
                {project.budgetDescription && (<ListItem>
                  <ListItemText
                    primary="Які витрати покриває бюджет:"
                    secondary={project.budgetDescription}
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
          
            {user&&<Button 
              elevation={15} 
              variant="contained" 
              size="small"
              style={{zIndex: 200, marginLeft:"1rem",marginBottom:"1rem", color:'white',backgroundColor:'grey'}} 
              onClick={()=>{
                console.log('button')
              }}
            >
              Додати проект в ініціативу
            </Button>}
            {project.contractors && project.contractors.find(c=>c==user.uid) &&<Button 
              elevation={15} 
              variant="contained" 
              size="small"
              color="secondary"
              style={{zIndex: 200, marginLeft:"1rem",marginBottom:"1rem"}} 
              onClick={async ()=>{
                const object = project
                console.log(object.id)
                if(object.id){
                  objects.doc(object.id).delete().then(function() {
                    Object.values(object.imageURL).forEach((url)=>{
                      const fileName = url.split('?')[0].split(directory+'%2F').reverse()[0]
                      images.child(fileName).delete().then(function() {
                      }).catch(function(error) {
                        console.log('Errored at image deletion', error)
                      });
                    })
                    setProject(null)
                  }).catch(function(error) {
                      console.error("Error removing document: ", error);
                  });
                }else{console.log(object)}
              }}
            >
              Видалити
            </Button>}
          
          </Suspense>
        </Paper>
    </form>
    )
  }</>)
}