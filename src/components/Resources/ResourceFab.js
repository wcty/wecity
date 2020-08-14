import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
import { Add } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  createFab: {
    position: 'fixed',
    bottom: '1rem',
    right: '2rem',
  },
}))  

export default ({ active, getMarker, isCreating, setIsCreating })=>{
  const classes = useStyles()

  return !isCreating && (
    <>
        <Fab 
          onClick={()=>{
            if(active){
              setIsCreating(true)
            }
          }}
          style={{
            zIndex:200
          }}
          className={classes.createFab} 
          raised="true" 
          aria-label="add"
        >
          <Add />
        </Fab>
      </>
  )
}