import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import socketHelper from './utils/socketHelper';
import App from './components/App';

const io = require('socket.io-client');
// Initilizing connection with node server.
var socket = io.connect('http://localhost:3000');

/* 
* custom redux middleware
* for handeling action that are type of event 
*/
const socketMiddleware = store => next => action => {
  if(action.event) {
    socket.emit(action.event.name, action.eventData);
  }
  return next(action);
}

// creating Redux store
let store = createStore(rootReducer, applyMiddleware(socketMiddleware));

/*
* Initilizing socket helper O_o 
* for listening server emitted events and for dispatching redux action for those
*/
socketHelper(socket, store.dispatch);

render(<App socket={socket} />, document.getElementById('app'));

/*
<Provider store={store}>
  <Router history={ browserHistory }>
    <Route path="/" component={App} />
  </Router>
</Provider>
*/
