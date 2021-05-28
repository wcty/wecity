import { useState, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { atoms } from 'misc'

export function useGeolocation() {

  // const defaultValue = {longitude: 30.5234, latitude: 50.4501}
  const [loaded, setLoaded] =  useState(false)
  const [location, setLocation] = useState<{longitude: number, latitude: number}|null>(null)
  const [viewport, setViewport] = useRecoilState(atoms.viewport)

  useEffect(()=>{
    if(location && !loaded){
      // console.log('viewport')
      setViewport(prev=>({...prev, ...location}))
      setLoaded(true)
    }
  },[loaded, location, setViewport])

  useEffect(()=>{
    if ("geolocation" in navigator) {

      const success = ( pos:any )=>{
        var crd = pos.coords;
        const updateLocation = crd.longitude?
          {
            longitude: crd.longitude, 
            latitude: crd.latitude
          } : null
        // console.log(updateLocation, crd)
        setLocation(updateLocation)
      }
      
      const error = ( err:any )=>{
        console.warn('ERROR(' + err.code + '): ' + err.message);
        setLocation(null)
      }

      const options = {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 5000
      }

      navigator.geolocation.watchPosition(success, error, options)
    }else{
      setLocation(null)
    }
  }, [setLocation])

  return location
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  
  function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
      width,
      height
    };
  }

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowDimensions;
}
