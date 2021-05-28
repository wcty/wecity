import MapGL, { AttributionControl, Layer, Source } from '@urbica/react-map-gl'
import { MapLayerMouseEvent } from 'mapbox-gl'
import { mapboxConfig, atoms, useGeolocation } from 'misc'
import { useRecoilState } from 'recoil'
import LocationIcon from './LocationIcon'
import LoadIcons from './LoadIcons'
import Markers from './Markers'
import Satellite from './Satellite'
import { useHistory, useLocation } from 'react-router-dom'

export default ()=>{
  const [viewport, setViewport] = useRecoilState(atoms.viewport);
  const [satellite] = useRecoilState(atoms.satellite)
  const [cursor, setCursor] = useRecoilState(atoms.cursor)
  const history = useHistory()
  const url = useLocation()

  const onClick = (event:MapLayerMouseEvent) => {
    if (event?.features?.length !== 0){ 
      const selected = event?.features?.[0]
      if(selected){
        console.log(selected)
        history.push(`/initiative/${event?.features?.[0]?.id}`) 
      }
    }
  }
 
  return (
      <>
        <MapGL
          style={{  width: '100%', height: '100%', border:"none", outline: "none" }}
          mapStyle="mapbox://styles/switch9/ckahu5spr0amr1ik3n1fg0fvt"
          accessToken={mapboxConfig.accessToken}
          onViewportChange={(v:any)=>setViewport({...viewport, ...v})}
          attributionControl={false}
          cursorStyle={cursor}
          {...viewport}
          onClick={()=>{ history.push('/') }}
        >
          <AttributionControl
            compact={true}
            position='bottom-left'
          />
          <LoadIcons />
          <Markers />
          { satellite && <Satellite />}
          <LocationIcon />
          <Source 
            id='initiatives'
            type='vector'
            url='https://tiles.weee.city/public.initiatives.json'
            promoteId='id'
          />
          <Layer 
            id='initiatives'
            type='circle'
            source='initiatives'
            source-layer='public.initiatives'
            paint={{
              'circle-color': '#009688',
              'circle-radius': 5,
              'circle-stroke-color': '#fff',
              'circle-stroke-width': 2
            }}
            onClick={onClick}
            onEnter={()=>setCursor("pointer")}
            onLeave={()=>setCursor("")}
          />
          <Layer
            id='initiative-markers'
            type='symbol'
            source='initiatives'
            minzoom={13}
            source-layer='public.initiatives'
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
              'text-offset': [0, 0],
            }}
            onClick={onClick}
            onEnter={()=>setCursor("pointer")}
            onLeave={()=>setCursor("")}
          />
        </MapGL>
      </>
    )
}
