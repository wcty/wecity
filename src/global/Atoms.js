import { atom } from 'recoil';

export const locationAtom = atom({
  key: 'location', 
  default: {
    latitude: 50.4501,
    longitude: 30.5234,
  }, 
});

export const viewAtom = atom({
  key: 'view', 
  default: {
    latitude: 50.4501,
    longitude: 30.5234,
  }, 
});

export const markerAtom = atom({
  key: 'marker',
  default: null,
});

export const selectedAtom = atom({
  key: 'selected',
  default: null,
});

export const markersAtom = atom({
  key: 'markers',
  default: {type:"FeatureCollection", features:[]},
});

export const creatingAtom = atom({
  key: 'creating',
  default: false,
});

export const barAtom = atom({
  key: 'bar',
  default: {height: 70},
});

export const mapAtom = atom({
  key: 'map',
  default: {},
});

export const userAtom = atom({
  key: 'user',
  default: null,
});