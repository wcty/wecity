
import { BrowserRouter, Route, Switch,  } from 'react-router-dom';
import { SessionProvider } from 'services/session';
import config from "config/kratos"
import { Dashboard } from 'containers/Dashboard';
import { Callback } from 'containers/Callback';
import { Login } from 'containers/Login';
import { Settings } from 'containers/Settings';
import './App.css';

import { Recover } from 'containers/Recover';
import { Verify } from 'containers/Verify';
import { Register } from 'containers/Register';

function App() {
  return (
    <div className="App">
        <BrowserRouter>
          <SessionProvider>
            <Switch>
              <Route exact path="/" >
                <Dashboard />
              </Route>
              <Route path="/callback">
                <Callback /> 
              </Route>
              <Route path={ config.routes.login.path }>
                <Login /> 
              </Route>
              <Route path={ config.routes.settings.path }>
                <Settings />
              </Route>
              <Route path={ config.routes.verification.path }>
                <Verify />
              </Route>
              <Route path={ config.routes.recovery.path }>
                <Recover/> 
              </Route>
              <Route path={ config.routes.registration.path }>
                <Register/> 
              </Route>
            </Switch>
             
          </SessionProvider>
        </BrowserRouter>
    </div>
  );
}

export default App;
