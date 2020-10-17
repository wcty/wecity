import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
import { Layers, Terrain } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  satelliteFab: {
    position: 'absolute',
    top: '9rem',
    right: '1rem',
    zIndex: 5
  }
}))  

export default ({ satellite, setSatellite })=>{
  const classes = useStyles()

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
      style={{zIndex:1}}
      //style={{backgroundColor: satellite?'grey':theme.palette.primary.light}}
    >
      {satellite?<Layers fontSize='small' />:<Terrain  fontSize='small'/>}
    </Fab>
  )
}