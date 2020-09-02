import { atom } from 'recoil';

export const locationAtom = atom({
  key: 'location', 
  default: null, 
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

export const initiativeBarAtom = atom({
  key: 'initiativeBar',
  default: false,
})

export const projectBarAtom = atom({
  key: 'projectBar',
  default: false,
})

export const resourceBarAtom = atom({
  key: 'resourceBar',
  default: false,
})

export const joiningAtom = atom({
  key: 'joining',
  default: false,
})

export const expanded = atom({
  key: 'expanded',
  default: false,
})

export const initiative = atom({
  key: 'initiative',
  default: false,
})

export const selectType = atom({
  key: 'selectType',
  default: null,
})

export const selectedProject = atom({
  key: 'selectedProject',
  default: null,
})