import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, HashRouter } from 'react-router-dom';
import AppContainer from './AppContainer';

ReactDOM.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
	 <React.StrictMode>
      <AppContainer/>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();
