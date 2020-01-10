import React from 'react';
import ReactDOM from 'react-dom';

import { rootReducer } from './redux/reducers';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';

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
      <App />
  </Provider>
)


<<<<<<< HEAD
ReactDOM.render(shadeFlow, document.getElementById('root'));
serviceWorker.unregister();
=======
ReactDOM.render(<App />, document.getElementById('root'));
serviceWorker.unregister();
>>>>>>> 8e00dc4ac453a5f9b52310c7d8644501b45f4b6c
