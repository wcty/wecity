import { createStore, compose } from 'redux'
import { createFirestoreInstance } from 'redux-firestore'
import rootReducer from './reducers'
import { firebase as fbConfig } from '../config/config'
import firebase from 'firebase'

export default function configureStore(initialState) {

  firebase.initializeApp(fbConfig)

  
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      // eslint-disable-next-line
      typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : (f) => f
    )
  )

  const rrfProps = {
    firebase,
    config: {
      userProfile: 'users',
      enableLogging: false,
    },
    dispatch: store.dispatch,
    createFirestoreInstance // <- needed if using firestore
  }

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      // eslint-disable-next-line
      const nextRootReducer = require('./reducers')

      store.replaceReducer(nextRootReducer)
    })
  }

  return { store, rrfProps }
}
