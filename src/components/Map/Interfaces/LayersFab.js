import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab, useTheme } from '@material-ui/core'
import { useRecoilState, useRecoilValue } from 'recoil'
import {  markerAtom, viewAtom, creatingAtom, userAtom, locationAtom } from 'global/Atoms'
import { Layers, SatelliteOutlined, Terrain } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  satelliteFab: {
    position: 'absolute',
    top: '9rem',
    right: '1rem'
  }
}))  

export default ({ satellite, setSatellite })=>{
  const classes = useStyles()
  const theme = useTheme()

  return ( 
    <Fab 
      onClick={()=>{
        setSatellite(!satellite)
      }}
      className={classes.satelliteFab} 
      raised="true" 
      aria-label="satellite layer"
      size='small'
      //color={satellite?'primary':'inherit'}
      //style={{backgroundColor: satellite?'grey':theme.palette.primary.light}}
    >
      {satellite?<Layers fontSize='small' />:<Terrain  fontSize='small'/>}
    </Fab>
  )
}