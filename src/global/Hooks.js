
import React, { useState } from 'react'
import * as geofirestore from 'geofirestore';
import { useFirestore } from 'reactfire';


export function useGeoFirestore() {
  const firestore = useFirestore()    //.settings({ experimentalForceLongPolling: true });
  const [GeoFirestore] = useState(geofirestore.initializeApp(firestore));
  return GeoFirestore;
}