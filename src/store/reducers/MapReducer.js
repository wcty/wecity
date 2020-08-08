import {
  MAP_SET_CURRENT_MARKER_POSITION,
  MAP_CHANGE_CREATION_MODE,
  MAP_SELECT_MARKER,
} from '../types'


console.log("mounted")
void (async ()=>{return 'void'})().then(d=>console.log(d+"and promise"))
if ("geolocation" in navigator) {
  console.log("messagefromstore with location")
  navigator.geolocation.getCurrentPosition(function(position) {
    console.log("Latitude is :", position.coords.latitude);
    console.log("Longitude is :", position.coords.longitude);
    console.log("messagefromstore")
  }, (err)=>{console.log(err)
});

} else {
  console.log("Location is not Available");
}

const INITIAL_STATE = {
  isCreating: false,
  center: [30.5234, 50.4501],
  selectedMarkerKey: null,
  currentMarkerPosition: null,
}

export default (state = INITIAL_STATE, action) => {
  
  switch (action.type) {
    case MAP_SET_CURRENT_MARKER_POSITION.REQUEST:
      return {
        ...state,
        currentMarkerPosition: action.payload,
      }
    case MAP_CHANGE_CREATION_MODE.REQUEST:
      return {
        ...state,
        isCreating: action.payload,
      }
    case MAP_SELECT_MARKER.REQUEST:
      return {
        ...state,
        selectedMarkerKey: action.payload,
        center: action.payload.position,
      }
    case '@@reactReduxFirebase/SET':
      return {
        ...state,
        isCreating: false,
      }
    default:
      return state
  }
}
