import { useEffect } from 'react'
import MarkerActive from 'assets/images/markerActive.svg'
import Marker from 'assets/images/marker.svg'

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
    map.addImage(name, markerSVG( img, size ), { pixelRatio: 2 });
  }
  img.src = Marker;
}

export default ({ mapRef, loaded, location })=>{

  useEffect(()=>{
    if(loaded){
      const map = mapRef.getMap()
      // map.addImage('pulsing-dot', pulsingDot(map), { pixelRatio: 2 });
      loadMarker(map, Marker, 'marker-fixed', 40, )
      loadMarker(map, MarkerActive, 'marker-active', 60)
    }
  }, [mapRef, loaded])

  return null
}