import 'resize-observer-polyfill/dist/ResizeObserver.global';
import React from 'react'
import ReactDOM from 'react-dom'
import App from './components/App'
import './styles/index.css'
import * as serviceWorker from './serviceWorker';

import { RecoilRoot } from 'recoil'
import { theme } from 'global/Theme'
import { ThemeProvider } from '@material-ui/core/styles'
import { BrowserRouter as Router } from "react-router-dom";
import { ApolloProvider, ApolloClient, InMemoryCache} from '@apollo/client';

// import { CookiesProvider } from "react-cookie"


const client = new ApolloClient({
  uri: 'https://hasura-aws.weee.city/v1/graphql',
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