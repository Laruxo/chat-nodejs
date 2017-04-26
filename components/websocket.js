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

  ws.on('message', function(message) {
    // TODO: send message to all clients
    ws.send(JSON.stringify([message]));
    db.insert(message);
  });

  ws.on('error', function(error) {
    console.log('ws', error);
  });

  ws.on('close', function(code) {
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
