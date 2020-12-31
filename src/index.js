import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Router, Route } from 'react-router-dom';
import { history } from '../src/helpers/history';
import Routes from "./routes";
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import { store } from "./store";

ReactDOM.render(

  <Provider store={store}>
  <Router  history={history}>
    <Routes />
    </Router>
  </Provider>,

  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
