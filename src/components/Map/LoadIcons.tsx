import { useEffect, useRef, useState } from 'react'
import { MapContext } from  '@urbica/react-map-gl'
import { Map, CustomLayerInterface } from 'mapbox-gl'
import MarkerActive from 'assets/images/markerActive.svg'
import Marker from 'assets/images/marker.svg'

type MarkerSVG = CustomLayerInterface & {
  offset: number,
  width:number,
  height: number,
  data: any,
  context?: CanvasRenderingContext2D,
}

const markerSVG = ( svg:HTMLImageElement, size:number ):MarkerSVG=>{
  
  return {
    width: size,
    height: (size * svg.height) / svg.width,
    data: new Uint8Array(size * ((size * svg.height) / svg.width) * 4),
    offset: size/3,
    context: undefined,
    id: 'markerSVG',
    type: 'custom',

    onAdd: function() {
      var canvas = document.createElement('canvas');
      canvas.width = this.width;
      canvas.height = this.height;
      this.context = canvas.getContext('2d')!!;
    },
    
    render: function() {
      var context = this.context;
      context?.clearRect(0, 0, this.width, this.height);
      context?.drawImage(svg, 0, 0, size, (size * svg.height) / svg.width);
      this.data = context?.getImageData( 0, 0, this.width, this.height ).data;
      return true;
    }
  }
}

const loadMarker = (map:Map, Marker:string, name:string, size:number)=>{
  var img = new Image();
  img.onload = function() {
    map.addImage(name, markerSVG( img, size ), { pixelRatio: 2 });
  }
  img.src = Marker;
}

export default function LoadIcons () {
  const loaded = useRef(false)
  return (
    <MapContext.Consumer>
      {(map:Map) => {
        if(!loaded.current){
          loadMarker(map, Marker, 'marker-fixed', 40, )
          loadMarker(map, MarkerActive, 'marker-active', 60)
          loaded.current = true
          return;  
        }
      }}
    </MapContext.Consumer>
  )
}