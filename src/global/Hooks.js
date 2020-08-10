
import React, { useState, useEffect, useMemo } from 'react'
import * as geofirestore from 'geofirestore';
import { useFirestore } from 'reactfire';
import { useRecoilState } from 'recoil';


export function useGeoFirestore() {
  const firestore = useFirestore()    //.settings({ experimentalForceLongPolling: true });
  const [GeoFirestore] = useState(geofirestore.initializeApp(firestore));
  return GeoFirestore;
}

export function useLocation() {
  const defaultValue = {longitude: 30.5234, latitude: 50.4501}
  const [location, setLocation] = useState(defaultValue)
  useEffect(()=>{
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(function(position) {
        const updateLocation = position.coords.longitude?{
          longitude: position.coords.longitude, latitude: position.coords.latitude}:defaultValue
        setLocation(updateLocation);
      })
    }
  }, [navigator, navigator.geolocation ])

  return location
}