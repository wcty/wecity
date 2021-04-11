import React from 'react'
import { Source, Layer } from '@urbica/react-map-gl'
import { useRecoilState } from 'recoil'
import * as atoms from 'misc/atoms'
import { getFeed } from 'misc'
import { useLocation, useHistory } from 'react-router-dom';
import { lastInitiatives } from 'misc/Queries';

export default () =>{
  const [feed,setFeed] = useRecoilState(atoms.initiativeFeed)
  const url = useLocation()
  const history = useHistory()
  const [slideIndex, setSlideIndex] = useRecoilState(atoms.indexAtom)
  const [next, setNext] = useRecoilState(atoms.nextAtom)
  const [last, setLast] = useRecoilState(atoms.lastAtom)
  const [offset, setOffset] = useRecoilState(atoms.offsetAtom)

  const onClick = (event) => {
    if (event.features.length > 0){ 

      const selected = [...last.features,...next.features].find(f=>f.properties.uid===event.features[0].properties.uid)
      if(selected){
        setOffset(0)
        setSlideIndex(1)
        setFeed([selected])
        console.log(selected)
        history.push(`/initiative/${event.features[0].properties.uid}`) 
      }
    }
  };

  return (
    <>  
      <Source
        id='markers'
        type='geojson'
        data={{
          type:'FeatureCollection', 
          features: [...last.features,...next.features,...(feed.length===1?feed:[])]
        }}
      />
      <Layer
        id='markers'
        type='symbol'
        source='markers'
        paint={{
          'text-color': 'black',
          'text-opacity': ["step", ['zoom'], 0, 15, 1 ],
          'text-halo-width': 1,
          'text-halo-color': "white",   
        }}
        layout={{
          'icon-image': ['case', ['==', ['get', 'uid'], url.pathname.replace('/initiative/','')], 'marker-active', 'marker-fixed'],
          'icon-anchor': 'bottom',
          'icon-allow-overlap': true,
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
          'text-field': ['case', ['==', ['get', 'id'], url.pathname.replace('/initiative/','')], ['get', 'name'], ''],
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