import { combineReducers } from 'redux'
import { firebaseReducer } from 'react-redux-firebase'
import MapReducer from './MapReducer'

const rootReducer = combineReducers({
  firebase: firebaseReducer,
  map: MapReducer,
})

export default rootReducer
