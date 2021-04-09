import React, { useEffect, useRef, Suspense, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import Map from './Map'
import { Route } from 'react-router-dom'
import Login from './Login'
import MenuFab from './Fabs/MenuFab'

const useStyles = makeStyles(theme => ({

  root:{
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  map: {
    top: 0,
    width: '100%',
    height: `100%`,
    position: 'fixed',
    zIndex:0,
	},
	sidebar: {
		marginTop: `100%`,
		width: '100%',
		
		[theme.breakpoints.up('sm')]: {
			marginTop: 0,
			width: '50%',
			maxWidth: 400,
			justify: "flex-end",
			float: "right",
    }
  }  
}))


export default () => {
  const classes = useStyles()

  return (
    <Box className={classes.root}>
      <Route path="/login">
        <Login/>
      </Route>
      <Route path="/">
        <Box className={classes.map}>
          <Map />
          <MenuFab />
        </Box>
      </Route>
    </Box>
  )
}
