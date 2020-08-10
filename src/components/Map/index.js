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
import LocationIcon from './Layers/LocationIcon.js'

import CreateInitiativeForm from './Forms/CreateInitiativeForm'
import Markers from './Layers/Markers.js'
import CreateFab from './Interfaces/CreateFab.js'
import LocateFab from './Interfaces/LocateFab.js'
import Initiative from './Interfaces/Initiative.js'


const useStyles = makeStyles(theme => ({
  mapContainer: {
    flexGrow: 0,
    height: '100%',
    position: 'relative',
  },
  overlay: {
    position: 'absolute',
    zIndex: 0,
    backgroundColor: 'rgba(0,0,0,0.2)',
    width: '100%',
    height: '100%',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  marker: {
    position: 'absolute',
    top: 'calc( ( 100% - 350px ) / 2  )',
    left: '50%',
    transform: 'translate(-16px, -16px)'
  }
}))          

const NewMarkerDialog = (props)=>{
  const [isCreating, setIsCreating] = useRecoilState(creatingAtom)
  const classes = useStyles()

  return <> 
    { isCreating && (<>
      <CreateInitiativeForm {...props} />
      <img alt="React Firebase" src={MarkerActive}  className={classes.marker} width={42} height={42} />
    </>)}
  </>
}

export default ()=>{

  const classes = useStyles()
  const [location, setLocation] = useRecoilState(locationAtom)
  const [view, setView] = useRecoilState(viewAtom)
  const [viewport, setViewport] = useState({ ...location, zoom: 15 });
  const mapRef = useRef()
  const mapDimensions = useRecoilValue(mapAtom)
  const [loaded, setLoaded] = useState(false)

  useEffect(()=>{
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          const updateLocation = Object.assign(viewport,
            {longitude: position.coords.longitude, 
            latitude: position.coords.latitude})
          setLocation(updateLocation);
        })
      }
  }, [navigator, navigator.geolocation])

  useEffect(()=>{
    if(mapRef.current){
      const map = mapRef.current.getMap()
      setView(map.getCenter())
    }
  }, [mapRef.current, viewport])

  return (
      <>
        <Suspense fallback={
          <CreateFab active={false} />
        }>
          <AuthCheck fallback={
            <CreateFab active={false} />   
          }>
            <CreateFab active={true} getMarker={()=>{
              const w = mapDimensions.width/2
              const h = (mapDimensions.height - 350)/2
              return mapRef.current.getMap().unproject ([w,h])
            }}/>
            <Initiative />
          </AuthCheck>
        </Suspense>
        <LocateFab mapRef={mapRef} loaded={loaded} />
        <MapGL
          style={{ width: '100%', height: '100%', border:"none", outline: "none" }}
          mapStyle="mapbox://styles/switch9/ckahu5spr0amr1ik3n1fg0fvt"
          accessToken={mapboxConfig.accessToken}
          onViewportChange={setViewport}
          onLoad={()=>{setLoaded(true)}}
          ref={mapRef}
          {...viewport}
        >
          <SuspenseWithPerf fallback={
            <div className={classes.overlay}>
              <CircularProgress />
            </div>
          } traceId={'load-markers'}>
            <Markers />
            <NewMarkerDialog getMarker={()=>{
              const w = mapDimensions.width/2
              const h = (mapDimensions.height - 350)/2
              return mapRef.current.getMap().unproject ([w,h])
            }}/>
            <LocationIcon 
              loaded={loaded} 
              mapRef={mapRef.current} 
              location={location}/>
          </SuspenseWithPerf>
        </MapGL>
      </>
    )
}
