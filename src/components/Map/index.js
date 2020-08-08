import React, { Suspense, Component, useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, CircularProgress, Typography, Fab } from '@material-ui/core'
import MapGL, { Source, Layer, FeatureState, MapContext } from '@urbica/react-map-gl'
import { mapBox } from '../../config'
import * as firebase from 'firebase/app';
//import 'firebase/firestore';
import * as geofirestore from 'geofirestore';
import { locationAtom, markerAtom, markersAtom, viewAtom, creatingAtom, mapAtom } from '../../global/Atoms'
import IMGCross from '../../assets/images/cross.svg'
import { useAuth, useUser, AuthCheck, useFirestoreDocData, useFirestore, SuspenseWithPerf, useFirebaseApp } from 'reactfire';
import { useRecoilState, useRecoilValue } from 'recoil'

import AddLocationIcon from '../../assets/images/addlocation.svg'
import Marker from '../../assets/images/marker.svg'
import CreateInitiativeForm from '../Forms/CreateInitiativeForm'

import { AddLocation } from '@material-ui/icons'


function useGeoFirestore() {
  const firestore = useFirestore()    //.settings({ experimentalForceLongPolling: true });
  const [GeoFirestore] = useState(geofirestore.initializeApp(firestore));
  return GeoFirestore;
}

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
    top: '2rem',
    right: '2rem'
  },
  marker: {
    position: 'absolute',
    top: 'calc( ( 100% - 350px ) / 2  )',
    left: '50%',
    transform: 'translate(-16px, -16px)'
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
      setMarkers({type:"FeatureCollection",features})
      console.log(markers)
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

const CreateMarker = ()=>{
  const GeoFirestore = useGeoFirestore()    //.settings({ experimentalForceLongPolling: true });
  const [marker, setMarker] = useRecoilState(markerAtom)
  const [isCreating, setIsCreating] = useRecoilState(creatingAtom)
  const classes = useStyles()

  useEffect(()=>{
    const geocollection = GeoFirestore.collection('markers');
    // Add a GeoDocument to a GeoCollection
    // geocollection.add({
    //   name: 'Geofirestore',
    //   score: 100,
    //   // The coordinates field must be a GeoPoint!
    //   coordinates: new firebase.firestore.GeoPoint(40.7589, -73.9851)
    // })
    // Create a GeoQuery based on a location
    //const query = geocollection.near({ center: new firebase.firestore.GeoPoint(40.7589, -73.9851), radius: 1000 });
    // Get query (as Promise)
    // query.get().then((value) => {
    //   // All GeoDocument returned by GeoQuery, like the GeoDocument added above
    //   value.docs.forEach(v=>console.log(v.data()))
    // });
    
  }, [GeoFirestore])
  return <> 
    { isCreating && !marker && (
      <>
      <CreateInitiativeForm />
      <img alt="React Firebase" src={Marker}  className={classes.marker} width={32} height={32} />
      </>
    )}
    {marker && isCreating && (
      <>
        <Source
          id='newMarker'
          type='geojson'
          data={marker}
        />
        <Layer
          id='newMarker'
          type='symbol'
          source='newMarker'
          paint={{
            'text-color': 'black',
            'text-opacity': 1,
            'icon-opacity-transition': {'duration': 0},
            'text-halo-width': 1,
            'text-halo-color': "white",
          }}
          layout={{
            'icon-image': 'marker',
            "icon-ignore-placement": true,
            "icon-allow-overlap": true,
            'text-field': ['get', 'name'],
            'text-anchor': 'bottom',
            'text-font': ["Montserrat SemiBold"],
            'text-size': 13,
            'text-padding': 12,
            'text-offset': [0, 2.2]
          }}
          transition={{
            "duration": 0,
            "delay": 0
          }}
        />
      </>
    )}
  </>
}


const CreateFab = ({active, getMarker })=>{
  const classes = useStyles()
  const [isCreating, setIsCreating] = useRecoilState(creatingAtom)
  const [view, setView] = useRecoilState(viewAtom)
  const [marker, setMarker] = useRecoilState(markerAtom)
  const [set, setSet] = useState(false)

  useEffect(()=>{

  }, [set])
  return (
    <>
    { isCreating ? (
      <>
        <Fab 
          onClick={() => {
            console.log(getMarker())
            const point =  {type:"FeatureCollection", features:[
              {type:"Feature", geometry:{
                type:"Point",
                coordinates: Object.values(getMarker())
              }}]}
            setMarker(point)
          }}
          className={classes.createFab} 
          raised="true" 
          color="primary" 
          aria-label="add"
        >
          <AddLocation />
        </Fab>
      </>
    ) : (
      <Fab 
        disabled={!active}
        onClick={()=>{setIsCreating(true)}}
        raised="true"
        className={classes.createFab} 
      >
        <img alt="React Firebase" src={AddLocationIcon} width={32} height={32} />
      </Fab>
    )}
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
              //const cLR = map.unproject ([w,h]).toArray()
              return mapRef.current.getMap().getCenter()
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
              <CreateMarker />
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
