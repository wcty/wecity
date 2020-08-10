import React, { Suspense, Component, useEffect, useState, useRef } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import { Grid, CircularProgress, Typography, Fab, Collapse } from '@material-ui/core'
import { Alert, AlertTitle } from '@material-ui/lab';
import MapGL, { Source, Layer, FeatureState, MapContext } from '@urbica/react-map-gl'
import { mapboxConfig } from 'config'
import * as firebase from 'firebase/app';
import { useAuth, useUser, AuthCheck, useFirestoreDocData, useFirestore, SuspenseWithPerf, useFirebaseApp } from 'reactfire';
import { useRecoilState, useRecoilValue } from 'recoil'
import { locationAtom, markerAtom, markersAtom, viewAtom, creatingAtom, mapAtom, userAtom, selectedAtom } from 'global/Atoms'
import { useGeoFirestore } from 'global/Hooks'
import { getFeatures } from 'global/Misc'
import { AddLocation } from '@material-ui/icons'
import MarkerActive from 'assets/images/markerActive.svg'

export default () =>{
  const GeoFirestore = useGeoFirestore() 
  const [markers, setMarkers] = useRecoilState(markersAtom)
  const [location, setLocation] = useRecoilState(locationAtom)
  const [selected, setSelected] = useRecoilState(selectedAtom)

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
  useEffect(()=>{
    console.log(selected)
  },[selected])

  const onClick = (event) => {
    if (event.features.length > 0) {
      console.log(event.features[0].properties.id);
      const nextClickedStateId = event.features[0].properties.id;
      if ( !selected || ( selected !== nextClickedStateId )) {
        setSelected(event.features[0].properties.id);
        console.log(event.features[0].properties.id);
      }
    }
  };

  const onLeave = () => {
    if (hoveredStateId) {
      setHoveredStateId(null);
    }
  };

  useEffect(()=>{

    const geocollection = GeoFirestore.collection('markers');
    geocollection.near({
      center: new firebase.firestore.GeoPoint(...Object.values(view)), 
      radius: 1000 }).get().then((value) => {
      setMarkers({type:"FeatureCollection", features: getFeatures(value)})
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
          'icon-image': ['case', ['==', ['get', 'id'], selected], 'marker-active', 'marker-fixed'],
          'icon-anchor': 'bottom',
          'text-field': ['get', 'name'],
          'text-anchor': 'bottom',
          'text-font': ["Montserrat SemiBold"],
          'text-size': 13,
          'text-padding': 12,
          'text-offset': [0, 1.2]
        }}
        // onHover={onHover}
        // onLeave={onLeave}
        onClick={onClick}
      />
      {/* {selected && <FeatureState id={selected} source='markers' state={{ selected: true }} />} */}
    </>
  )
}