import React from 'react';
import ReactDOM from 'react-dom';
import { Route } from 'react-router';
import { BrowserRouter } from 'react-router-dom';

import './assets/css/index.css';
import App from './App';
import registerServiceWorker from './assets/js/registerServiceWorker';
import { requireAuth } from './utils/AuthService';
import Paintings from './components/Paintings';
import Callback from './components/Callback';
const Root = () => {
    return (
      <div className="container">
        <BrowserRouter ref = {(c) => this.context = c} >
          <div>
            <Route path="/" component={App}/>
            <Route path="/paintings" component={Paintings} onEnter={requireAuth} />
            <Route path="/callback" component={Callback} />
          </div>
        </BrowserRouter>
      </div>
    )
}

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
