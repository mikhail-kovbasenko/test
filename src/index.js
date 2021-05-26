import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import AppContainer from './AppContainer';

ReactDOM.render(
  <HashRouter basename={`/test`}>
	 <React.StrictMode>
      <AppContainer/>
    </React.StrictMode>
  </HashRouter>,
  document.getElementById('root')
);
reportWebVitals();
