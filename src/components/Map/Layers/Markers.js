import React from 'react'
import { Source, Layer } from '@urbica/react-map-gl'
import { useRecoilState } from 'recoil'
import * as Atoms from 'global/Atoms'
import { getFeed } from 'global/Misc'
import { useLocation, useHistory } from 'react-router-dom';
import { lastInitiatives } from 'global/Queries';

export default () =>{
  const [feed,setFeed] = useRecoilState(Atoms.initiativeFeed)
  const url = useLocation()
  const history = useHistory()
  const [slideIndex, setSlideIndex] = useRecoilState(Atoms.indexAtom)
  const [next, setNext] = useRecoilState(Atoms.nextAtom)
  const [last, setLast] = useRecoilState(Atoms.lastAtom)
  const [offset, setOffset] = useRecoilState(Atoms.offsetAtom)

  const onClick = (event) => {
    if (event.features.length > 0){ 

      const selected = [...last.features,...next.features].find(f=>f.properties.uid===event.features[0].properties.uid)
      // console.log(selected, feed )
      if(selected){
        // console.log(base)
        //setBase(0)
        setOffset(0)
        setSlideIndex(1)
        setFeed([selected])
        console.log(selected)
        history.push(`/initiative/${event.features[0].properties.uid}`) 

      }

      // if(feed.length===1){
      //   setFeed(getFeed({next,last}))
      // }
      // console.log(index, feed, last.features, next.features, event.features[0].properties)
      // if(index!==-1){
      //   const baseIndex = offset + feed.map(f=>f.properties.uid).indexOf('explore')
      //   const actualIndex= index-baseIndex
      //   console.log(actualIndex)
      //   setSlideIndex(actualIndex)
      // }
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