import React, { useState, useEffect, useMemo, Suspense } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Collapse, Paper, Typography, IconButton, Box,Fab, List, ListItem, ListItemText, Button, TextField } from '@material-ui/core'
import Intro from './Intro'
import { Route, useLocation } from 'react-router-dom'
const useStyles = makeStyles((theme) => ({
  paper:{
    borderRadius: '0',
    overflowY: 'scroll',
    height: `100%`,
    width: '100%',
    bottom: '0',
    right: '0',
    minHeight: "250px",
    overflowX: "hidden",
    zIndex: 10,
    position: 'fixed',
    transitionDuration: '0.3s',
    [theme.breakpoints.up('sm')]: {
      maxWidth: 400,
		},
  },
  alert: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    zIndex: 999,
    maxWidth: 'calc( 100% - 4rem )'
  }
}));

export default ({ mapRef, loaded })=> {
  const classes = useStyles()
  const location = useLocation()
  return <>
      <Paper className={classes.paper} > 
        <Route to="/intro" exact ><Intro/></Route>
      </Paper>
    </>
}