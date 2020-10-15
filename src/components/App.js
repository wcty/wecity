import React, { useEffect, useRef, Suspense, useState } from 'react'
// import * as serviceWorker from '../serviceWorker';
import { makeStyles } from '@material-ui/core/styles'
import { Box, useEventCallback } from '@material-ui/core'
import AppBar from './AppBar'
import Map from './Map'
import { barAtom, mapAtom } from 'global/Atoms'
import { RecoilRoot, useRecoilState, useSetRecoilState } from 'recoil'
import useMeasure from "use-measure";
import { theme } from 'global/Theme'
import { firebaseConfig } from 'config'
import { ThemeProvider } from '@material-ui/core/styles'
import { FirebaseAppProvider, useUser, useAuth } from 'reactfire'
import FeedbackForm from './AppBar/FeedbackForm'
import { BrowserRouter as Router, Route, useHistory } from "react-router-dom";
import { ApolloProvider, ApolloClient, createHttpLink, InMemoryCache, gql } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const useClient = () => {
  const [state, setState]= useState()
  const user = useUser()
  const auth = useAuth()

  useEffect(()=>{
    
      if(!user) {
        auth.signInAnonymously()
      }else{
        localStorage.setItem('token', user.uid);
        const httpLink = createHttpLink({
          uri: 'https://wecity.westeurope.azurecontainer.io/graphql',
          //uri: 'http://localhost:4000/graphql',

        });
        
        const authLink = setContext((_, { headers }) => {
          // get the authentication token from local storage if it exists
          const token = localStorage.getItem('token');
          // return the headers to the context so httpLink can read them
          return {
            headers: {
              ...headers,
              authorization: token ? `Bearer ${token}` : "",
            }
          }
        });
        const client = new ApolloClient({
          link: authLink.concat(httpLink),
          cache: new InMemoryCache({
            addTypename: false
          })
        });
        console.log(user)
        setState(client)
      }
      
  },[user, auth])

  return state
};

const Apollo = ({children})=>{
  const client = useClient()

  return client ? <ApolloProvider client={client}>
    {children}
  </ApolloProvider> : null
}

const useStyles = makeStyles(theme => ({

  root:{
    position: "fixed",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0
  },
  map: {
    top: 70,
    width: '100%',
    height: `100%`,
    position: 'fixed',
    zIndex:0,
	},
	sidebar: {
		marginTop: `100%`,
		width: '100%',
		
		[theme.breakpoints.up('sm')]: {
			marginTop: 0,
			width: '50%',
			maxWidth: 400,
			justify: "flex-end",
			float: "right",
    }
  }  
}))

const Layout = ()=>{
  const classes = useStyles()
  const [barDimensions] = useRecoilState(barAtom)
  const mapRef = useRef()
  const mapMeasure = useMeasure(mapRef)
  const setMapDimensions = useSetRecoilState(mapAtom)
  const history = useHistory()

  useEffect(()=>{
    setMapDimensions(mapMeasure)
  }, [mapMeasure, setMapDimensions])
  
  return (
      <Box className={classes.root}>
        <AppBar />
        <Suspense fallback={null}>
          <Route path='/feedback' render={()=><FeedbackForm />} />
        </Suspense>

        <Box className={classes.map} style={{zIndex: -10, top: barDimensions.height}} ref={mapRef}>
          <Map />
        </Box>
      </Box>
  )
}

export default () => {
  
  return (
    <Router>
      
      <FirebaseAppProvider firebaseConfig={firebaseConfig}>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <Suspense fallback={null} >
              <Apollo>
                <Layout />
              </Apollo>
            </Suspense>
          </RecoilRoot>
        </ThemeProvider>
      </FirebaseAppProvider>
    </Router>
  )
}
