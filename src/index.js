import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect, Switch } from 'react-router-dom';

import './assets/css/index.css';
import App from './layouts/App/App.jsx';
import Auth from './utils/Auth/Auth';
import indexRoutes from "./routes/index.jsx";

const auth = new Auth();

const handleAuthentication = ({ location }) => {
  if (/access_token|id_token|error/.test(location.hash)) {
    auth.handleAuthentication();
  }
}

ReactDOM.render(
  <HashRouter>
    <Switch>
      {indexRoutes.map((prop, key) => {
        if (prop.name === "Paintify") {
          return (<Route path="/" render={()=><prop.component auth={auth} />} key={key} />)
        } else if (prop.name === "/Callback") { 
          return (<Route path="/callback" render={(props) => {
            handleAuthentication(props);
            return <prop.component {...props} />
          }} />);
        }
      })}
    </Switch>
  </HashRouter>,
  document.getElementById("root")
);
/*const Root = () => {
    return (
      <div className="container">
      <HashRouter>
        <Switch>
          {indexRoutes.map((prop, key) => {
            return <Route to={prop.path} component={prop.component} key={key} />;
          })}
        </Switch>
      </HashRouter>
        <Router history={history} >
          <div>
            <Route path="/" render={(props) => <App auth={auth} {...props}/>}/>
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
} */