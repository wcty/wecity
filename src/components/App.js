import React from 'react'
import { RecoilRoot } from 'recoil';
//import { Provider } from 'react-redux'
//import { ReactReduxFirebaseProvider } from 'react-redux-firebase'
import { ThemeProvider } from '@material-ui/core/styles'
import MainLayout from './MainLayout'
import { theme } from '../global/Theme'
import { firebaseConfig } from '../config/config'
import { FirebaseAppProvider, useFirestoreDocData, useFirestore, SuspenseWithPerf } from 'reactfire'

const App = () => (
  <FirebaseAppProvider firebaseConfig={firebaseConfig}>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <MainLayout />
        </RecoilRoot>
      </ThemeProvider>
  </FirebaseAppProvider>
)

export default App
