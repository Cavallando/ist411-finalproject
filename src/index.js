import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route,Redirect } from 'react-router-dom';

import './assets/css/index.css';
import App from './App';
import registerServiceWorker from './assets/js/registerServiceWorker';
import Auth from './utils/Auth/Auth';
import Callback from './components/Callback';
import Profile from './components/Profile';
import history from './utils/history';

const auth = new Auth();

const handleAuthentication = ({location}) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

const Root = () => {
    return (
      <div className="container">
        <Router history={history} >
          <div>
            <Route path="/" component={(props) => <App auth={auth} {...props}/>}/>
            <Route path="/profile" render={(props) => (
              !auth.isAuthenticated() ? (
                <Redirect to="/"/>
              ) : (
                <Profile auth={auth} {...props} />
              )
            )} />
            <Route path="/callback" render={(props) => {
              handleAuthentication(props);
              return <Callback {...props} /> 
            }}/> 
          </div>
        </Router>
      </div>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
