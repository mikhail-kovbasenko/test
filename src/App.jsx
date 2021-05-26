import React from 'react';
import './App.css';
import Content from './components/Main/Main';
import Header from './components/Header/Header';

const App = props => (
  <div className="wrapper">
    <div className="content">
      <Header src={props.returnSrc}/>
      <Content state={props.state}/>
    </div>
  </div>
);

export default App;
