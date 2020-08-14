import React, { useEffect, useState } from 'react'
import { Source, Layer } from '@urbica/react-map-gl'
import * as firebase from 'firebase/app';
import { useRecoilState, useRecoilValue } from 'recoil'
import { locationAtom, markersAtom, viewAtom, selectedAtom } from 'global/Atoms'
import { useGeoFirestore } from 'global/Hooks'
import { getFeatures } from 'global/Misc'

export default () =>{
  const GeoFirestore = useGeoFirestore() 
  const [markers, setMarkers] = useRecoilState(markersAtom)
  const [selected, setSelected] = useRecoilState(selectedAtom)

  const view = useRecoilValue(viewAtom)

  const onClick = (event) => {
    if (event.features.length > 0) {
      const nextClickedStateId = event.features[0].properties.id;
      if ( !selected || ( selected !== nextClickedStateId )) {
        console.log(event.features[0].properties.id)
        setSelected(event.features[0].properties.id);
      }
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
          'text-opacity': ["step",
                            ['zoom'],
                            0,
                            15, 1
                          ],
          'text-halo-width': 1,
          'text-halo-color': "white",   
        }}
        layout={{
          'icon-image': ['case', ['==', ['get', 'id'], selected], 'marker-active', 'marker-fixed'],
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
                15, 1
            ],
          'text-allow-overlap': true,
          'icon-ignore-placement': true,
          'text-ignore-placement': true,
          'symbol-spacing': 1,
          'text-field': ['get', 'name'],
          'text-anchor': 'bottom',
          'text-font': ["Montserrat SemiBold"],
          'text-size': 13,
          'text-padding': 12,
          'text-offset': [0, 1.2]
        }}
        onClick={onClick}
      />
    </>
  )
}