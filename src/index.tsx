import 'resize-observer-polyfill/dist/ResizeObserver.global';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './styles/index.css'
import * as serviceWorker from './serviceWorker';
import { theme, atoms, RecoilExternalStatePortal } from 'misc'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error'
import { jwtToken, logout } from 'misc'
import { RecoilRoot, SetterOrUpdater,  } from 'recoil';

const logoutLink = onError(({ networkError }) => {
 if ( 
    networkError &&
    'statusCode' in networkError &&
    networkError.statusCode === 401
  ) { logout() };
})

const httpLink = createHttpLink({
  uri: 'https://hasura-aws.weee.city/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  
  if (jwtToken.current) {
      return {
          headers: {
              ...headers,
              Authorization: `Bearer ${jwtToken.current}`
          }
      }
  }
  return headers
});

export const client = new ApolloClient({
  link: logoutLink.concat(authLink.concat(httpLink)),
  cache: new InMemoryCache({
    addTypename: false
  }),
});

const rootElement = document.getElementById("root");
ReactDOM.render(
  <React.StrictMode>
    {/* <CookiesProvider> */}
      <Router>
        <ThemeProvider theme={theme}>
          <RecoilRoot>
            <RecoilExternalStatePortal />
            <ApolloProvider client={client}>
              <App />
            </ApolloProvider>
          </RecoilRoot>
        </ThemeProvider>
      </Router>
    {/* </CookiesProvider> */}
  </React.StrictMode>,
  rootElement
);
serviceWorker.unregister()