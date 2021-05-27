import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import AppContainer from './AppContainer';

ReactDOM.render(
  <BrowserRouter>
	 <React.StrictMode>
      <AppContainer/>
    </React.StrictMode>
  </BrowserRouter>,
  document.getElementById('root')
);
reportWebVitals();
