import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/App';

const io = require('socket.io-client');
var socket = io.connect('http://localhost:3000');

const eventEmitter = store => next => action => {
  if(action.type === 'event') {
    socket.emit(action.eventName, action.eventData);
  }
  return next(action);
}

let store = createStore(rootReducer, applyMiddleware());


render(<App socket={socket} />, document.getElementById('app'));

/*
<Provider store={store}>
  <Router history={ browserHistory }>
    <Route path="/" component={App} />
  </Router>
</Provider>
*/
