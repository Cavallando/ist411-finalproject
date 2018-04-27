import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Palette from './components/Palette/Palette';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
