import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Header from './header';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
ReactDOM.render(
  <BrowserRouter>
    <Header />
  </BrowserRouter>,
  document.getElementById('root')
);

reportWebVitals();
