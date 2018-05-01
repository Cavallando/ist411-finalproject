import React from 'react';
import { Route, Router, Redirect, Switch } from 'react-router-dom';
import App from '../layouts/App/App';
import Callback from '../components/Callback/Callback';
import Auth from '../utils/Auth/Auth';
import history from '../utils/history';
import UserProfile from '../views/UserProfile/UserProfile';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

export const makeMainRoutes = () => {
  return (
      <Router history={history}>
        <Switch>
          <Route path="/app" render={(props) => <App auth={auth} {...props} />} />
          <Route path="/profile" render={(props) => (
            !auth.isAuthenticated() ? (
              <Redirect to="/app"/>
            ) : (
              <UserProfile auth={auth} {...props} />
            )
          )} />
          <Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <Callback {...props} /> 
          }}/>
        </Switch>
      </Router>
  );
}