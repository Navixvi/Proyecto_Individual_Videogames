import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import store from './redux/store';
import { createStore, combineReducers } from 'redux';
import { paginationReducer } from './redux/reducer';
import { BrowserRouter } from 'react-router-dom';

const rootReducer = combineReducers({
  pagination: paginationReducer,
});

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
 
  <Provider store={store}>
  <BrowserRouter>
      <App />
  </BrowserRouter>
  </Provider>
);