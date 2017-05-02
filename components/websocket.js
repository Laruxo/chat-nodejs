const events = require('events');
const messageEmitter = new events.EventEmitter();
const db = require('./database');
const WebSocket = require('ws');
let id;

module.exports = function() {
  id = 0;

  const wss = new WebSocket.Server({
    port: 8001,
    path: '/chat',
  });

  wss.on('connection', handleConnection);
  wss.on('error', handleError);
};

/**
 * Handles incoming web socket connection
 * @param {WebSocket} ws
 */
function handleConnection(ws) {
  const thisClient = ++id;

  const listener = function(message) {
    ws.send(JSON.stringify([message]));
  };
  messageEmitter.on('newMessage', listener);

  ws.on('message', function(message) {
    messageEmitter.emit('newMessage', message);
    db.insert(message);
  });

  ws.on('error', function(error) {
    console.log('ws', error);
  });

  ws.on('close', function(code) {
    messageEmitter.removeListener('newMessage', listener);
    console.log(thisClient + ' disconnected. Code ' + code);
  });

  ws.send(JSON.stringify(db.all()));
}

/**
 * Handles web socket server error
 * @param {Error} error
 */
function handleError(error) {
  console.error('wss', error);
}
