import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter , Route, Redirect, Switch } from 'react-router-dom';

import './assets/css/index.css';
import App from './layouts/App/App.jsx';
import Auth from './utils/Auth/Auth';
import indexRoutes from "./routes/index.jsx";
import { makeMainRoutes } from './routes/routes';
//<Route path="/app" render={()=><App auth={auth} />}/>)


const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
);

/*
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
const Root = () => {
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