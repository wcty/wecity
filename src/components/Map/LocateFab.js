import React, {  useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Fab } from '@material-ui/core'
import { useRecoilState } from 'recoil'
import { locationAtom } from 'global/Atoms'
import { MyLocation } from '@material-ui/icons'

const useStyles = makeStyles(theme => ({
  locateFab: {
    position: 'absolute',
    top: '5.5rem',
    right: '1rem',
    zIndex: 5,
    background: '#ffffff'
  }
}))  

export default ({ mapRef, loaded })=>{
  const classes = useStyles()
  const [location] = useRecoilState(locationAtom)

  useEffect(()=>{
    if(loaded&&location){
      const map = mapRef.current.getMap()
      map.jumpTo({center: [location.longitude, location.latitude], zoom: 16});
    }
  }, [mapRef, loaded])

  return <>
    <Fab 
      onClick={()=>{
        if(location){
          if(loaded){
            const map = mapRef.current.getMap()
            map.flyTo({center: [location.longitude, location.latitude], offset:[0, -125], zoom: 16});
          }
        }
      }}
      className={classes.locateFab} 
      raised="true" 
      size="small"
      aria-label="add"
      disabled={!location}
      style={{zIndex:1}}
    >
      <MyLocation />
    </Fab>
  </>
}