import 'resize-observer-polyfill/dist/ResizeObserver.global';
import React from 'react'
import { render, hydrate } from 'react-dom'
import App from './components/App'
import './styles/index.css'
import * as serviceWorker from './serviceWorker';
import { theme, RecoilExternalStatePortal, auth } from 'misc'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error'
import { RecoilRoot, } from 'recoil';
import { createBrowserHistory } from 'history'

const logoutLink = onError(({ networkError }) => {
 if ( 
    networkError &&
    'statusCode' in networkError &&
    networkError.statusCode === 401
  ) { auth.logout() };
})

const httpLink = createHttpLink({
  uri: 'https://hasura-aws.weee.city/v1/graphql',
});

const authLink = setContext((_, { headers }) => {
  const jwtToken = auth.getJWTToken();
  if (jwtToken) {
      return {
          headers: {
              ...headers,
              Authorization: `Bearer ${jwtToken}`
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

export const history = createBrowserHistory();

const rootElement = document.getElementById("root")!!

const AppRoot = ()=> 
  <React.StrictMode>
    <Router {...{history}}>
      <ThemeProvider theme={theme}>
        <RecoilRoot>
          <RecoilExternalStatePortal />
          <ApolloProvider client={client}>
            <App />
          </ApolloProvider>
        </RecoilRoot>
      </ThemeProvider>
    </Router>
  </React.StrictMode>

if (rootElement.hasChildNodes()) {
  hydrate(<AppRoot />, rootElement);
} else {
  render(<AppRoot />, rootElement);
}
serviceWorker.unregister()