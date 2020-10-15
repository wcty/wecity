import React, { useEffect, useState, useRef } from 'react'
import { Source, Layer } from '@urbica/react-map-gl'
import * as firebase from 'firebase/app';
import { useRecoilState, useRecoilValue } from 'recoil'
import { markersAtom, viewAtom, locationAtom, swipePosition } from 'global/Atoms'
import { useGeoFirestore } from 'global/Hooks'
import { getFeatures } from 'global/Misc'
import { useLocation, useHistory, useParams } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import { nearbyInitiatives } from 'global/Queries'

const querySize = 20
function arrayUnique(a) {
  for(var i=0; i<a.length; ++i) {
      for(var j=i+1; j<a.length; ++j) {
          if(a[i].properties.uid === a[j].properties.uid)
              a.splice(j--, 1);
      }
  }

  return a;
}

export default () =>{
  const GeoFirestore = useGeoFirestore() 
  const [markers, setMarkers] = useRecoilState(markersAtom)
  const view = useRecoilValue(viewAtom)
  const location = useLocation()
  const [geolocation] = useRecoilState(locationAtom)
  const [sp, setSP] = useRecoilState(swipePosition)
  const history = useHistory()
  const { initiativeID, postID } = useParams();
  const vars = useRef({variables: {nearInitiativesInput:{ point: Object.values(view), minDistance: 0, limit: querySize }}})
  const { loading, error, data, refetch } = useQuery(nearbyInitiatives, vars.current);
  if (loading) console.log('loading');
  if (error) console.log('error', error);

  useEffect(()=>{
    if(!markers.features[0] && data) {
      console.log(data)
      setMarkers({type:"FeatureCollection", features: data.nearInitiatives})
    }
    if(sp===markers.features.length-2) {
      if(vars.variables.nearInitiativesInput.minDistance!==markers.features[markers.features.length-1].properties.distance){
        console.log('here')
        vars.current.variables.nearInitiativesInput.minDistance = markers.features[markers.features.length-1].properties.distance
        refetch(vars.current)
      }
      if(data && data.nearInitiatives[0].properties.distance>=markers.features[markers.features.length-1].properties.distance){
        const [first, ...other] = data.nearInitiatives
        setMarkers({type:"FeatureCollection", features: arrayUnique([...markers.features, ...data.nearInitiatives]) })
        console.log(data, markers)
      }
    }
  },[sp, setMarkers, data])

  const onClick = (event) => {
    if (event.features.length > 0) {
      //const nextClickedStateId = event.features[0].properties.id;
      history.push(`/initiative/${event.features[0].properties.uid}`)
    }
  };
  const [started, setStarted] = useState()

  useEffect(()=>{
    if(!started&&markers.features[0]&&sp===0&&location.pathname==="/"){
      setStarted(true)
      history.push(`/initiative/${markers.features[0].properties.uid}`)
    }
  },[markers.features, sp, location])

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
          'text-opacity': ["step",
                            ['zoom'],
                            0,
                            15, 1
                          ],
          'text-halo-width': 1,
          'text-halo-color': "white",   
        }}
        layout={{
          'icon-image': ['case', ['==', ['get', 'uid'], location.pathname.replace('/initiative/','')], 'marker-active', 'marker-fixed'],
          'icon-anchor': 'bottom',
          'icon-allow-overlap': true,
            // ["step",
            //   ['zoom'],
            //   false,
            //   13, true
            // ],
          'icon-size': 
            ["interpolate",
              ["linear"],
              ['zoom'],
                9, 0.2,
                16, 1.35
            ],
          'text-allow-overlap': true,
          'icon-ignore-placement': true,
          'text-ignore-placement': true,
          'symbol-spacing': 1,
          'text-field': ['case', ['==', ['get', 'id'], location.pathname.replace('/initiative/','')], ['get', 'name'], ''],
          'text-anchor': 'top',
          'text-font': ["Montserrat SemiBold"],
          'text-size': 13,
          'text-padding': 0,
          'text-offset': [0, 0]
        }}
        onClick={onClick}
        onEnter={()=>{document.body.style.cursor="pointer"}}
        onLeave={()=>{document.body.style.cursor=""}}

      />
    </>
  )
}