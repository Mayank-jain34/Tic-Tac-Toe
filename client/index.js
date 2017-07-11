import React from 'react';
import { render } from 'react-dom';
import App from './components/App';

const io = require('socket.io-client');
var socket = io.connect('http://localhost:3000');

render(<App socket={socket} />, document.getElementById('app'));
