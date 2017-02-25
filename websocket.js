module.exports = (emitter) => {
  const db = require('./database');

  const WebSocket = require('ws');
  const wss = new WebSocket.Server({
    port: 3001,
    path: '/getMessages'
  });

  let id = 0;
  wss.on('connection', function(ws) {
    let thisClient = ++id;

    let listener = function(message) {
      ws.send(JSON.stringify([message]));
    };
    emitter.on('newMessage', listener);

    ws.on('message', function(message) {
      emitter.emit('newMessage', message);
      db.insert(message);
    });

    ws.on('error', function(error) {
      console.log('ws', error);
    });

    ws.on('close', function(code) {
      console.log(thisClient + ' disconnected. Code ' + code);
      emitter.removeListener('newMessage', listener);
    });

    ws.send(JSON.stringify(db.all()));
  });

  wss.on('error', function(error) {
    console.log('wss', error);
  });
};
