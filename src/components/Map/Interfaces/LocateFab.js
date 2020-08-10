import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab, Collapse } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import { useRecoilState, useRecoilValue } from 'recoil'
import {  markerAtom, viewAtom, creatingAtom, userAtom, locationAtom } from 'global/Atoms'
import { MyLocation } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  locateFab: {
    position: 'absolute',
    top: '5rem',
    right: '1rem'
  }
}))  

const getLocation = ()=>{
  let locate
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const updateLocation = {
        longitude: position.coords.longitude, 
        latitude: position.coords.latitude
      }
      locate = updateLocation;
      return updateLocation;
    })
  }else{
    locate = null;
    return null
  }
  return locate
}

export default ({ active, getMarker, mapRef, loaded })=>{
  const classes = useStyles()
  const [isCreating, setIsCreating] = useRecoilState(creatingAtom)
  const [view, setView] = useRecoilState(viewAtom)
  const [marker, setMarker] = useRecoilState(markerAtom)
  const [alert, setAlert] = useState(null)
  const user = useRecoilValue(userAtom)
  const [location, setLocation] = useRecoilState(locationAtom)

  useEffect(()=>{
    if(loaded){
      const map = mapRef.current.getMap()
    }
  }, [mapRef, loaded])

  return (
    <>
    { !isCreating && (
      <>
        <Fab 
          onClick={()=>{
            if(location){
              //setLocation(getLocation())
              if(loaded){
                const map = mapRef.current.getMap()
                map.flyTo({center: [location.longitude, location.latitude], zoom: 16});
              }
            }
            console.log(location)

          }}
        
          className={classes.locateFab} 
          raised="true" 
          aria-label="add"
        >
          <MyLocation />
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