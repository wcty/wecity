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

import MarkerActive from 'assets/images/markerActive.svg'
import Marker from 'assets/images/marker.svg'

const pulsingDot = (map)=>{
  var size = 60;
  
  // implementation of CustomLayerInterface to draw a pulsing dot icon on the map
  // see https://docs.mapbox.com/mapbox-gl-js/api/#customlayerinterface for more info
  return {
    width: size,
    height: size,
    data: new Uint8Array(size * size * 4),
    
    // get rendering context for the map canvas when layer is added to the map
    onAdd: function() {
      var canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d');
    },
    
    // called once before every frame where the icon will be used
    render: function() {
      var duration = 1000;
      var t = (performance.now() % duration) / duration;
      
      var radius = (size / 2) * 0.5;
      var outerRadius = (size / 2) * 0.7 * t + radius;
      var context = this.context;
      
      // draw outer circle
      context.clearRect(0, 0, this.width, this.height);
      context.beginPath();
      context.arc(
        this.width / 2,
        this.height / 2,
        outerRadius,
        0,
        Math.PI * 2
      );
      context.fillStyle = 'rgba(255, 200, 200,' + (1 - t) + ')';
      context.fill();
      
      // draw inner circle
      context.beginPath();
      context.arc(
        this.width / 2,
        this.height / 2,
        radius,
        0,
        Math.PI * 2
      );
      context.fillStyle = 'rgba(255, 100, 100, 1)';
      context.strokeStyle = 'white';
      context.lineWidth = 2 + 4 * (1 - t);
      context.fill();
      context.stroke();
      
      // update this image's data with data from the canvas
      this.data = context.getImageData(
        0,
        0,
        this.width,
        this.height
      ).data;
      
      // continuously repaint the map, resulting in the smooth animation of the dot
      map.triggerRepaint();
      
      // return `true` to let the map know that the image was updated
      return true;
    }
  }
}

const markerSVG = (svg, size)=>{
  
  return {
    width: size,
    height: (size * svg.height) / svg.width,
    data: new Uint8Array(size * ((size * svg.height) / svg.width) * 4),
    offset: size/3,
    
    onAdd: function() {
      var canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d');
    },
    
    render: function() {
      var context = this.context;
      context.clearRect(0, 0, this.width, this.height);
      context.drawImage(svg, 0, 0, size, (size * svg.height) / svg.width);
      this.data = context.getImageData( 0, 0, this.width, this.height ).data;
      return true;
    }
  }
}

const loadMarker = (map, Marker, name, size)=>{
  var img = new Image();
  img.onload = function() {
    map.addImage(name, markerSVG( img, size ));
  }
  img.src = Marker;
}

export default ({ mapRef, loaded, location })=>{

  useEffect(()=>{
    if(loaded){
      const map = mapRef.getMap()
      map.addImage('pulsing-dot', pulsingDot(map), { pixelRatio: 2 });
      const svgWrapper = document.createElement("div")
      loadMarker(map, Marker, 'marker-fixed', 20, )
      loadMarker(map, MarkerActive, 'marker-active', 30)
    }
    console.log(location)
  }, [mapRef, loaded])

  return (
    <>
      <Source
        id='points'
        type='geojson'
        data={{
          'type': 'FeatureCollection',
          'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [location.longitude, location.latitude]
              }
            }
          ]
        }}
      />
      <Layer
        id='points'
        type='symbol'
        source='points'
        layout={{
          'icon-image': 'pulsing-dot',
        }}
      />
    </>
  )
}