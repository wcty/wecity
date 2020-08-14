import React, { useState, useEffect, Suspense } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Divider, List, Typography, ListItem, ListItemText, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil';
import { projectBarAtom, barAtom, selectedAtom, creatingAtom } from 'global/Atoms'
import { useStorage, useFirestoreCollectionData, useFirestore, useUser } from 'reactfire';
import { People, LocationOn, ExpandLess, Star, StarBorder } from '@material-ui/icons'
import distance from '@turf/distance'
import ProjectFab from './ProjectFab'
import CreateProject from './CreateProject'
import Project from './Project'

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    zIndex: 999,
    position: 'fixed',
    height: "100%",
    width: "100%",
    overflowX: "hidden",
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
  },
  info:{
    padding: theme.spacing(2),
    //height:'100%',
    width: '100%'
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
  paper:{
    height: "100%",
    minHeight: "250px",
    width: "100%",
    overflowX: "hidden",
    transitionDuration: '0.3s'
  },
}));

export default ()=> {
  const classes = useStyles();
  const theme = useTheme();
  const user = useUser()
  const bar = useRecoilValue(barAtom)
  const [projectBar, setprojectBar] = useRecoilState(projectBarAtom)
  const [selected, setSelected] = useRecoilState(selectedAtom)
  const [isCreating, setIsCreating] = useState(false)
  const [currentFilter, setCurrentFilter] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const projectsRef = currentFilter?
    useFirestore()
    .collection('projects')
    .where("category", "==", currentFilter):
    useFirestore()
    .collection('projects')
  const projects = useFirestoreCollectionData(projectsRef)
  const categories = [
    "Всі категорії",
    "Озеленення",
    "Громадські простори",
    "Побутові",
    "Відпочинок",
    "Допомога",
    "Мистецтво",
    "Бізнес",
    "Інше"
  ]
  useEffect(()=>{
    console.log(projects)
  },[projects])
  return (<>
    <Paper elevation={1} className={classes.root} 
      style={{
        height: `calc(100% - ${bar.height}px)`, 
        width:'100%',
        bottom: '0',
        right: '0',
        borderRadius: '0',
        overflowY: 'scroll'
      }}
    > 
      {user && <ProjectFab isCreating={isCreating} setIsCreating={setIsCreating} active />}
      <CreateProject isCreating={isCreating} setIsCreating={setIsCreating} />
      {selectedProject&& <Project project={selectedProject} setProject={setSelectedProject} />}
      {!isCreating && <div id="wrapper">
        <Typography variant="h6" style={{
          margin:'2rem',
          marginBottom: '1rem',
          textAlign: 'center'
        }}>Бібліотека проектних рішень</Typography>

        <FormControl variant="outlined"
          style={{width: 'calc(100% - 2rem)', marginLeft:'1rem'}}>
          <InputLabel id='category' >Оберіть категорію</InputLabel>
          <Select
            labelId='category'
            id='categorySelect'
            value={currentFilter||"Всі категорії"}
            onChange={(e)=>{
              setCurrentFilter(e.target.value=="Всі категорії"?null:e.target.value)
            }}
            label='category'
          >
            {categories.map(opt=><MenuItem key={opt} value={opt}>{opt}</MenuItem>)}
          </Select>
        </FormControl>
        <List>
          {projects[0] ? 
          (<><Grid container spacing={1} style={{padding:'1rem'}}>
          {projects.map((project, i)=>{
            console.log(project)
              // (distance([location.longitude, location.latitude], Object.values(project.coordinates)))<1 ? 
              return (
                <Grid key={i} item xs={6} s={4}>
                  <Paper className={classes.paper} style={{cursor:'pointer'}}>
                    <div id="wrapper">
                      <section 
                        className={classes.img} 
                        alt="Cover of the project"
                        onClick={()=>{
                          if(selectedProject&&(selectedProject.id==project.id)){
                            setSelectedProject(null)
                          }else{
                            setSelectedProject(project)
                          }
                        }}
                        style={{
                          backgroundImage: `url(${project.imageURL.m || addImage})`,
                          backgroundPosition: 'center',
                          backgroundSize: 'cover',
                          backgroundRepeat: 'no-repeat',
                          borderTopLeftRadius: "5px",
                          borderTopRightRadius: "5px"         
                      }}>
                      </section>
                      <div className={classes.info}             
                        onClick={()=>{                          
                          if(selectedProject&&(selectedProject.id==project.id)){
                            setSelectedProject(null)
                          }else{
                            setSelectedProject(project)
                          }
                      }}>

                        <Typography variant="h6">
                          {project.name? project.name: "Name is not set"}
                        </Typography>
                        <Typography variant="body">
                          {project.contractor? project.contractor: "Contractor is not set"}
                        </Typography>
                      </div>
                  </div>
                  </Paper>
                </Grid>
              )
          })}
          </Grid>
          </>):
          <Typography style={{
            margin: '2rem',
            textAlign: 'center'
          }}>
            В бібліотеці поки що немає проектів за даною категорією. 
            Будьте першими хто їх додасть.
          </Typography>
          }
        </List>
      </div>}
    </Paper>
  </>)
}