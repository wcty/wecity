import React, { useState, useEffect } from 'react';
import { makeStyles, Paper } from '@material-ui/core';
import { useRecoilValue } from 'recoil';
import * as Atoms from 'global/Atoms'
import { useUser } from 'reactfire';
import ProjectFab from './ProjectFab'
import Project from './Project'
import ProjectLibrary from './ProjectLibrary'
import { Redirect, Route } from 'react-router-dom'
const useStyles = makeStyles((theme)=>({
  root: {
    flexGrow: 1,
    zIndex: 999,
    position: 'fixed', 
    width:'100%',
    bottom: '0',
    right: '0',
    borderRadius: '0',
    overflowX: "hidden",
    overflowY: 'scroll',
    padding: '1rem',
    paddingTop: 0,
    paddingBottom: 0,
    boxSizing: 'border-box',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
    },
  }
}))

export default ()=> {
  const classes = useStyles()
  const user = useUser()
  const bar = useRecoilValue(Atoms.barAtom)
  const [redirect, setRedirect] = useState()
  
  useEffect(()=>{
    if(redirect){
      setRedirect(null)
    }
  },[redirect])

  return (<>
    {redirect && <Redirect to={redirect}/>}
    <Paper elevation={1} className={classes.root}
      style={{
        height: `calc(100% - ${bar.height}px)`,
      }}
    > 
      {user && <ProjectFab/>}
      <ProjectLibrary />
      <Route path="/projects/:projectId">
        <Project/>
      </Route> 
    </Paper>
  </>)
}