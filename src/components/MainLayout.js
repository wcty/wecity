/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component, useEffect, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Box } from '@material-ui/core'
import AppBar from './AppBar'
import Map from './Map'
import { barAtom, mapAtom } from '../global/Atoms'
import { useRecoilState } from 'recoil'
import useMeasure from "use-measure";

const useStyles = makeStyles(theme => ({

  root:{
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  map: {
    top: 70,
    width: '100%',
    height: `100%`,
    position: 'fixed',
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

const MainLayout = () => {

  const classes = useStyles()
  const [barDimensions, setBarDimensions] = useRecoilState(barAtom)
  useEffect(()=>{
    console.log(barDimensions)
  }, [barDimensions])

  const mapRef = useRef()
  const mapMeasure = useMeasure(mapRef)
  const [mapDimensions, setMapDimensions] = useRecoilState(mapAtom)
  useEffect(()=>{
    setMapDimensions(mapMeasure)
  }, [mapMeasure])

  return (
    <Box className={classes.root}>
      <AppBar />
      <Box className={classes.map} style={{top: barDimensions.height}} ref={mapRef}>
        <Map />
      </Box>
    </Box>
  )
}

export default MainLayout
