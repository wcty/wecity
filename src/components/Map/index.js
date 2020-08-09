import React, { Suspense, Component, useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, CircularProgress, Typography, Fab, Collapse } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import MapGL, { Source, Layer, FeatureState, MapContext } from '@urbica/react-map-gl'
import { mapBox } from '../../config'
import * as firebase from 'firebase/app';
//import 'firebase/firestore';
import { useGeoFirestore } from '../../global/Hooks'
import { locationAtom, markerAtom, markersAtom, viewAtom, creatingAtom, mapAtom, userAtom } from '../../global/Atoms'
import IMGCross from '../../assets/images/cross.svg'
import { useAuth, useUser, AuthCheck, useFirestoreDocData, useFirestore, SuspenseWithPerf, useFirebaseApp } from 'reactfire';
import { useRecoilState, useRecoilValue } from 'recoil'

import AddLocationIcon from '../../assets/images/addlocation.svg'
import Marker from '../../assets/images/marker.svg'
import MarkerActive from '../../assets/images/markerActive.svg'

import CreateInitiativeForm from '../Forms/CreateInitiativeForm'

import { AddLocation } from '@material-ui/icons'

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
  createFab: {
    position: 'absolute',
    top: '1rem',
    right: '1rem'
  },
  marker: {
    position: 'absolute',
    top: 'calc( ( 100% - 350px ) / 2  )',
    left: '50%',
    transform: 'translate(-16px, -16px)'
  },
  alert: {
    position: 'absolute',
    top: '1rem',
    left: '1rem',
    maxWidth: '60%'
  }
}))          

const Markers = ()=>{
  const GeoFirestore = useGeoFirestore() 
  const [markers, setMarkers] = useRecoilState(markersAtom)
  const [location, setLocation] = useRecoilState(locationAtom)
  const view = useRecoilValue(viewAtom)

  const [hoveredStateId, setHoveredStateId] = useState(null);
  const onHover = (event) => {
    if (event.features.length > 0) {
      const nextHoveredStateId = event.features[0].id;
      if (hoveredStateId !== nextHoveredStateId) {
        setHoveredStateId(nextHoveredStateId);
      }
    }
  };

  const onLeave = () => {
    if (hoveredStateId) {
      setHoveredStateId(null);
    }
  };

  useEffect(()=>{
    console.log("Firestore test")

    const geocollection = GeoFirestore.collection('markers');
    // Create a GeoQuery based on a location
    const query = geocollection.near({
      center: new firebase.firestore.GeoPoint(...Object.values(view)), 
      radius: 1000 });

    // Get query (as Promise)
    query.get().then((value) => {
      // All GeoDocument returned by GeoQuery, like the GeoDocument added above
      const features = value.docs.map(v=>{
        const {coordinates, g, ...properties} = v.data()
        const feature = {
          type:"Feature",
          geometry:{
            type:"Point",
            coordinates:Object.values(coordinates)
          },
          properties
        }
        return feature
      })
      setMarkers({type:"FeatureCollection", features})
    });
  
  }, [GeoFirestore])
  return (
    <>
      <Source
        id='markers'
        type='geojson'
        data={markers}
      />
      <Layer
        id='markers'
        type='symbol'
        source='markers'
        paint={{
          'text-color': 'black',
          'text-opacity': 1,
          'text-halo-width': 1,
          'text-halo-color': "white",
        }}
        layout={{
          'icon-image': 'marker',
          'text-field': ['get', 'name'],
          'text-anchor': 'bottom',
          'text-font': ["Montserrat SemiBold"],
          'text-size': 13,
          'text-padding': 12,
          'text-offset': [0, 2.2]
        }}
        onHover={onHover}
        onLeave={onLeave}
      />
      {hoveredStateId && <FeatureState id={hoveredStateId} source='markers' state={{ hover: true }} />}
    </>
  )
}

const CreateMarker = (props)=>{
  const GeoFirestore = useGeoFirestore()    //.settings({ experimentalForceLongPolling: true });
  const [marker, setMarker] = useRecoilState(markerAtom)
  const [isCreating, setIsCreating] = useRecoilState(creatingAtom)
  const classes = useStyles()

  return <> 
    { isCreating && (
      <>
      <CreateInitiativeForm {...props} />
      <img alt="React Firebase" src={MarkerActive}  className={classes.marker} width={42} height={42} />
      </>
    )}
  </>
}

const CreateFab = ({active, getMarker })=>{
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

const HomeScreen = ()=>{

  const classes = useStyles()

  const [location, setLocation] = useRecoilState(locationAtom)
  const [view, setView] = useRecoilState(viewAtom)

  const [viewport, setViewport] = useState({
    ...location,
    zoom: 15
  });
  const mapRef = useRef()
  const mapDimensions = useRecoilValue(mapAtom)

  useEffect(()=>{
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
          console.log("Latitude is :", position.coords.latitude);
          console.log("Longitude is :", position.coords.longitude);
          const updateLocation = Object.assign(viewport,
            {longitude: position.coords.longitude, 
            latitude: position.coords.latitude}//,
            )
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
          </AuthCheck>
        </Suspense>

        <MapGL
          style={{ width: '100%', height: '100%', border:"none", outline: "none" }}
          mapStyle="mapbox://styles/switch9/ckahu5spr0amr1ik3n1fg0fvt"
          accessToken={mapBox.accessToken}
          onViewportChange={setViewport}
          ref={mapRef}
          {...viewport}
        >
          <SuspenseWithPerf fallback={
            <div className={classes.overlay}>
              <CircularProgress />
            </div>
          } traceId={'load-markers'}>
              <Markers />
              <CreateMarker getMarker={()=>{
              const w = mapDimensions.width/2
              const h = (mapDimensions.height - 350)/2
              return mapRef.current.getMap().unproject ([w,h])
            }}/>
          </SuspenseWithPerf>
        </MapGL>
      </>
    )
}

export default HomeScreen


//firebase   { path: 'markers', queryParams: ['orderByKey', 'limitToLast=100'] }, 
// firebase: { data: { markers } },
// map: { isCreating, center, selectedMarkerKey, currentMarkerPosition }
// }) => ({
// markers,
// isCreating,
// center,
// selectedMarkerKey,
// currentMarkerPosition,
