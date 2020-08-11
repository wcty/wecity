import React, { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
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
      map.jumpTo({center: [location.longitude, location.latitude], zoom: 16});
    }
  }, [mapRef, loaded])

  return ( !isCreating && (
      <>
        <Fab 
          onClick={()=>{
            if(location){
              if(loaded){
                const map = mapRef.current.getMap()
                map.flyTo({center: [location.longitude, location.latitude], zoom: 16});
              }
            }
          }}
          className={classes.locateFab} 
          raised="true" 
          aria-label="add"
        >
          <MyLocation />
        </Fab>
      </>
    ) 
  )
}