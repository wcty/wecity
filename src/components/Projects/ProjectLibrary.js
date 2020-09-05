import React, { useState, useEffect, Suspense } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Divider, List, Typography, ListItem, FormControlLabel, Checkbox, ListItemText, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil';
import * as Atoms from 'global/Atoms'
import { useStorage, useFirestoreCollectionData, useFirestore, useUser } from 'reactfire';
import { People, LocationOn, ExpandLess, Star, StarBorder } from '@material-ui/icons'
import distance from '@turf/distance'
import { categories } from 'global/forms/projectCategories'
import { useI18n } from 'global/Hooks'

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

export default ({ onlyMine, select })=>{
  
  const classes = useStyles();
  const user = useUser()
  const [currentFilter, setCurrentFilter] = useState(null)
  const [selectedProject, setSelectedProject] = useRecoilState(Atoms.selectedProject)
  const [filterMine, setFilterMine] = useState(true)
  const projectsRefPre = currentFilter?
    useFirestore()
    .collection('projects')
    .where("category", "==", currentFilter):
    useFirestore()
    .collection('projects')
  const projectsRef = filterMine&&user? projectsRefPre.where("contractors", "array-contains", user.uid): projectsRefPre
  const projects = useFirestoreCollectionData(projectsRef)
  const lang = useRecoilValue(Atoms.lang)
  const i18n = useI18n()
  return (
    <div id="wrapper">
      <Typography variant="h6" style={{
        margin:'2rem',
        marginBottom: '1rem',
        textAlign: 'center'
      }}>{onlyMine?i18n('myProjectsTitle'):i18n('projectsLibraryTitle')}</Typography>

      <FormControl variant="outlined"
        style={{width: '100%'}}>
        <InputLabel id='category' >{i18n('chooseCategory')}</InputLabel>
        <Select
          labelId='category'
          id='categorySelect'
          value={currentFilter||"all"}
          onChange={(e)=>{
            setCurrentFilter(e.target.value=="all"?null:e.target.value)
          }}
          label='category'
        >
          {categories(i18n).map(opt=><MenuItem key={opt.name} value={opt.name}>{opt.label}</MenuItem>)}
        </Select>
      </FormControl>
      {!onlyMine && user && <FormControl >
        <FormControlLabel
          control={
            <Checkbox
              checked={filterMine}
              onChange={()=>setFilterMine(!filterMine)}
              name="Show only mine"
              //color="primary"
            />
          }
          label="Показати лише створені мною"
        />
      </FormControl>}
      <List>
        {projects[0] ? 
        (<><Grid container spacing={1}>
        {projects.map((project, i)=>{
          //console.log(project)
            // (distance([location.longitude, location.latitude], Object.values(project.coordinates)))<1 ? 
            return (
              <Grid key={i} item xs={6} s={4}>
                <Paper className={classes.paper} style={{cursor:'pointer'}}>
                  <div id="wrapper">
                    <section 
                      className={classes.img} 
                      alt="Cover of the project"
                      onClick={()=>{
                        console.log('clicked')
                        if(select){
                          select(project)
                        }else{
                          if(selectedProject&&(selectedProject.id==project.id)){
                            setSelectedProject(null)
                          }else{
                            setSelectedProject(project)
                          }
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
                        console.log('clicked')  
                        if(select){
                          select(project)
                        }else{                      
                          if(selectedProject&&(selectedProject.id==project.id)){
                            setSelectedProject(null)
                          }else{
                            setSelectedProject(project)
                          }
                        }
                    }}>

                      <Typography variant="h6">
                        {project.name? project.name: "Name is not set"}
                      </Typography>
                      <Typography variant="body2">
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
          {onlyMine? `Ви ще не створили проектів ${currentFilter=="all"?'у бібліотеці':'за даною категорією'}`:
          `В бібліотеці поки що немає проектів ${currentFilter=="all"?'':'за даною категорією'}. 
          Будьте першими хто їх додасть.`}
        </Typography>
        }
      </List>
    </div>
  )
}