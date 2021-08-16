import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from "./app";
import {applyMiddleware ,createStore} from 'redux';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import reducers from './reducer/reducer.store';
import {Provider } from 'react-redux'

export const store = applyMiddleware(promise,thunk)(createStore)(reducers)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
