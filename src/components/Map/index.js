import React, { Suspense, useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { CircularProgress } from '@material-ui/core'
import MapGL from '@urbica/react-map-gl'
import { mapboxConfig } from 'config'
import { AuthCheck, SuspenseWithPerf } from 'reactfire';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil'
import { locationAtom,viewAtom, creatingAtom, mapAtom } from 'global/Atoms'
import LocationIcon from './Layers/LocationIcon.js'
import LoadIcons from './Layers/LoadIcons.js'

import CreateInitiative from 'components/Initiatives/CreateInitiative'
import InitiativeFab from 'components/Initiatives/InitiativeFab.js'
import Initiative from 'components/Initiatives/Initiative.js'
import Initiatives from 'components/Initiatives'

import LocateFab from './Interfaces/LocateFab.js'
import Markers from './Layers/Markers.js'
import Satellite from './Layers/Satellite.js'
import LayersFab from './Interfaces/LayersFab.js'
import { Redirect, Route, useHistory } from 'react-router-dom'
import SwipeableViews from 'react-swipeable-views';

import offlineStyle from 'assets/style.json'

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
    transform: 'translate(-21px, -42px)'
  }
}))          

export default ()=>{
  const setIsCreating = useSetRecoilState(creatingAtom)
  const classes = useStyles()
  const [location, setLocation] = useRecoilState(locationAtom)
  const setView = useSetRecoilState(viewAtom)
  const [viewport, setViewport] = useState({ latitude: 50.4501, longitude: 30.5234, zoom:15 });
  const mapRef = useRef()
  const mapDimensions = useRecoilValue(mapAtom)
  const [loaded, setLoaded] = useState(false)
  const [satellite, setSatellite] = useState(false)
  const history = useHistory()

  const getMarker = ()=>{
    const w = mapDimensions.width/2
    const h = (mapDimensions.height - 350)/2
    return mapRef.current.getMap().unproject ([w,h])
  }

  useEffect(()=>{
      if ("geolocation" in navigator) {
        navigator.geolocation.watchPosition(function(position) {
          const updateLocation = {
            longitude: position.coords.longitude, 
            latitude: position.coords.latitude,
            zoom: viewport.zoom
          }
          setLocation(position.coords.longitude?updateLocation:false);
        })
      }else{
        setLocation(false);
      }
  }, [navigator, navigator.geolocation, setLocation])

  useEffect(()=>{
    if(mapRef.current){
      const map = mapRef.current.getMap()
      setView(map.getCenter())
    }
  }, [viewport, setView])
  
  return (
      <>
        <Suspense fallback={null}>
          <Route path='/initiatives' render={()=><Initiatives mapRef={mapRef}/>} />
        </Suspense>
        <Suspense fallback={
          <InitiativeFab active={false} />
        }>
          <AuthCheck fallback={
            <InitiativeFab active={false} />   
          }>
            <InitiativeFab active={true} getMarker={getMarker}/>
          </AuthCheck>
        </Suspense>
        <Suspense fallback={null}>
          <Route path={'/initiative/:initiativeID'} >
            <Initiative mapRef={mapRef} loaded={loaded} getMarker={getMarker}/>
          </Route>
        </Suspense>
        <LocateFab mapRef={mapRef} loaded={loaded} />
        <LayersFab satellite={satellite} setSatellite={setSatellite} />
        <MapGL
          style={{  width: '100%', height: '100%', border:"none", outline: "none" }}
          //mapStyle={process.env.NODE_ENV == 'production'?"mapbox://styles/switch9/ckahu5spr0amr1ik3n1fg0fvt": offlineStyle}
          mapStyle="mapbox://styles/switch9/ckahu5spr0amr1ik3n1fg0fvt"
          //mapStyle='mapbox://styles/mapbox/satellite-v9'
          accessToken={mapboxConfig.accessToken}
          onViewportChange={setViewport}
          onLoad={()=>{setLoaded(true)}}
          ref={mapRef}
          //hash={true}
          {...viewport}
          onClick={()=>{
            history.push('/')
            console.log('mapclick')
            //setSelected(null)
          }}
        >
          {satellite && <Satellite />}
          <SuspenseWithPerf fallback={
            <div className={classes.overlay}>
              <CircularProgress />
            </div>
          } traceId={'load-markers'}>
            <LoadIcons 
              loaded={loaded} 
              mapRef={mapRef.current} 
              location={location} />
            <Markers />

            <Route path="/create-initiative" 
              render={()=>loaded && 
              <CreateInitiative 
                getMarker={getMarker} 
                loaded={loaded} 
                mapRef={mapRef} 
                cancel={()=>{setIsCreating(false); history.push('/') }} 
              />}
            />
            
            { location &&
            <LocationIcon 
              loaded={loaded} 
              mapRef={mapRef.current} 
              location={location} />
            }
          </SuspenseWithPerf>
        </MapGL>
      </>
    )
}
