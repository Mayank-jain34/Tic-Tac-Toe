import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import rootReducer from './reducers';
import socketHelper from './utils/socketHelper';
import App from './components/app/AppContainer';

const io = require('socket.io-client');
// Initilizing connection with node server.
var socket = io.connect('http://localhost:3000');

/*
* custom redux middleware
* for handeling action that are type of event
*/
const socketMiddleware = store => next => action => {
  if(action.event) {
    socket.emit(action.event.name, action.event.data);
  }
  return next(action);
}

// creating Redux store
let store = createStore(rootReducer, applyMiddleware(socketMiddleware));

/*
* Initilizing socket helper O_o
* for listening server emitted events and for dispatching redux action for those
*/
socketHelper(socket, store);

render(
  <Provider store={store}>
    <App socket={socket} />
  </Provider>,
  document.getElementById('app')
);
