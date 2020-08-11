import React, { useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab, Collapse } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useRecoilState, useRecoilValue } from 'recoil'
import {  markerAtom, viewAtom, creatingAtom, userAtom, mapAtom } from 'global/Atoms'
import { AddLocation, MyLocation } from '@material-ui/icons'
import useMeasure from "use-measure";

const useStyles = makeStyles(theme => ({
  createFab: {
    position: 'absolute',
    top: '1rem',
    right: '1rem'
  },
  alert: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    maxWidth: '60%'
  }
}))  

export default ({ active, getMarker })=>{
  const classes = useStyles()
  const [isCreating, setIsCreating] = useRecoilState(creatingAtom)
  const [map] = useRecoilState(mapAtom)
  const [alert, setAlert] = useState(null)
  const user = useRecoilValue(userAtom)
  const fabRef = useRef()
  const fab = useMeasure(fabRef)

  return (
    <>
    { !isCreating && (
      <>
        <Fab 
          onClick={()=>{
            if(active){
              setIsCreating(true)
            }else{
              setAlert({description: "You need to login to create a marker"})
            }
          }}
          ref={fabRef}
          className={classes.createFab} 
          raised="true" 
          color="primary" 
          aria-label="add"
        >
          <AddLocation />
        </Fab>
      </>
    ) 

    }
    { alert && !user && (
      <Collapse in={Boolean(alert)}>
        <Alert severity="info" className={classes.alert} onClose={() => {setAlert(null)}}>
          <AlertTitle>Info</AlertTitle>
          {alert.description}
        </Alert>
      </Collapse>
    )

    }
    </>
  )
}