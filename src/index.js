import ReactDOM from 'react-dom';

import './assets/css/index.css';
import { makeMainRoutes } from './routes/routes';
//<Route path="/app" render={()=><App auth={auth} />}/>)


const routes = makeMainRoutes();

ReactDOM.render(
  routes,
  document.getElementById('root')
)