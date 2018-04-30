import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route, Redirect, Switch } from 'react-router-dom';
import Callback from './views/Callback/Callback';

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
//<Route path="/app" render={()=><App auth={auth} />}/>)
ReactDOM.render(
  <BrowserRouter>
    <Switch>
        <Route to="/app" render={(props) => {
            handleAuthentication(props);
            return <App auth={auth} {...props} />
          }}/>);
        }
      })}
    </Switch>
  </BrowserRouter>,
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