import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'reactjs-popup/dist/index.css';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Navigation from './components/NavigationComponent';
import Home from './components/HomeComponent';
import Register from './components/AccountRegisterComponent'

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Navigation />
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route exact path="/register"><Register /></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
