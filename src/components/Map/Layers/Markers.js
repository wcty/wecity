import React, { useEffect, useState } from 'react'
import { Source, Layer } from '@urbica/react-map-gl'
import * as firebase from 'firebase/app';
import { useRecoilState, useRecoilValue } from 'recoil'
import { locationAtom, markersAtom, viewAtom, selectedAtom } from 'global/Atoms'
import { useGeoFirestore } from 'global/Hooks'
import { getFeatures } from 'global/Misc'
import { Redirect, useLocation } from 'react-router-dom';
import { useStorage, useStorageDownloadURL, useFirestore, useUser } from 'reactfire'

export default () =>{
  const GeoFirestore = useGeoFirestore() 
  const [markers, setMarkers] = useRecoilState(markersAtom)
  const [redirect, setRedirect] = useState(null)
  const view = useRecoilValue(viewAtom)
  const location = useLocation()

  const onClick = (event) => {
    if (event.features.length > 0) {
      const nextClickedStateId = event.features[0].properties.id;
      setRedirect(`/initiative/${event.features[0].properties.id}`)
    }
  };

  useEffect(()=>{

    const geocollection = GeoFirestore.collection('initiatives');
    geocollection.near({
      center: new firebase.firestore.GeoPoint(...Object.values(view)), 
      radius: 1000 }).get().then((value) => {
      setMarkers({type:"FeatureCollection", features: getFeatures(value)})
    });
  }, [GeoFirestore])
  
  useEffect(()=>{
    if(redirect!==null){
      setRedirect(null)
    }
  },[redirect, setRedirect])
  
  return (
    <>  
      {redirect && <Redirect to={redirect}/>}
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
          'icon-image': ['case', ['==', ['get', 'id'], location.pathname.replace('/initiative/','')], 'marker-active', 'marker-fixed'],
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