import React from 'react'
import { Source, Layer } from '@urbica/react-map-gl'

export default ({ satellite }) =>{
  
  return (
    <>
      <Source
        id='satellite'
        type='raster'
        url='mapbox://mapbox.satellite'
      />
      <Layer
        id='satellite'
        type='raster'
        source='satellite'
        before='points'
      />
    </>
  )
}