import React, { Suspense, Component, useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, CircularProgress, Typography, Fab, Collapse } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import MapGL, { Source, Layer, FeatureState, MapContext } from '@urbica/react-map-gl'
import { mapboxConfig } from 'config'
import * as firebase from 'firebase/app';
import { useAuth, useUser, AuthCheck, useFirestoreDocData, useFirestore, SuspenseWithPerf, useFirebaseApp } from 'reactfire';
import { useRecoilState, useRecoilValue } from 'recoil'
import { locationAtom, markerAtom, markersAtom, viewAtom, creatingAtom, mapAtom, userAtom } from 'global/Atoms'
import { useGeoFirestore } from 'global/Hooks'

import { AddLocation } from '@material-ui/icons'
import MarkerActive from 'assets/images/markerActive.svg'


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
  const [view, setView] = useRecoilState(viewAtom)
  const [marker, setMarker] = useRecoilState(markerAtom)
  const [alert, setAlert] = useState(null)
  const user = useRecoilValue(userAtom)

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