import React, { useState, useEffect, Suspense } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper, Divider, List, Typography, ListItem, FormControlLabel, Checkbox, ListItemText, FormControl, InputLabel, Select, MenuItem, Grid } from '@material-ui/core';
import addImage from 'assets/images/addImage.png'
import { useRecoilState, useRecoilValue } from 'recoil';
import * as Atoms from 'global/Atoms'
import { useStorage, useFirestoreCollectionData, useFirestore, useUser } from 'reactfire';
import { People, LocationOn, ExpandLess, Star, StarBorder } from '@material-ui/icons'
import distance from '@turf/distance'
import ProjectFab from './ProjectFab'
import CreateProject from './CreateProject'
import Project from './Project'
import ProjectLibrary from './ProjectLibrary'

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
  const user = useUser()
  const bar = useRecoilValue(Atoms.barAtom)
  const [selected, setSelected] = useRecoilState(Atoms.selectedAtom)
  const [isCreating, setIsCreating] = useState(false)
  const [selectedProject, setSelectedProject] = useRecoilState(Atoms.selectedProject)

  return (<>
    <Paper elevation={1} className={classes.root} 
      style={{
        height: `calc(100% - ${bar.height}px)`, 
        width:'100%',
        bottom: '0',
        right: '0',
        borderRadius: '0',
        overflowY: 'scroll',
        padding: '1rem',
        paddingTop: 0,
        paddingBottom: 0,
        boxSizing: 'border-box'
      }}
    > 
      {user && <ProjectFab isCreating={isCreating} setIsCreating={setIsCreating} active />}
      {!isCreating && <ProjectLibrary />}
      {isCreating && <CreateProject cancel={()=>setIsCreating(false)} submit={(docRef, doc)=>{setSelectedProject(doc.data()); setIsCreating(false)}} variant='text' submitText='Додати' />}
      {selectedProject&& <Project project={selectedProject} setProject={setSelectedProject} />}
    </Paper>
  </>)
}