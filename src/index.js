import React from 'react';
import ReactDOM from 'react-dom';

import { rootReducer } from './redux/reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from "react-router-dom";

import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import './index.scss';
import App from './containers/App/App';
import * as serviceWorker from './serviceWorker';

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk)),
)

const shadeFlow = (
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>
)


ReactDOM.render(shadeFlow, document.getElementById('root'));
serviceWorker.unregister();
