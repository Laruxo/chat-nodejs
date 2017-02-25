const events = require('events');
let receivedMessageEmitter = new events.EventEmitter();
require('../websocket')(receivedMessageEmitter);

// HTTP server starts ----------------------------------
const db = require('../database');
const http = require('http');
const fs = require('fs');

function serveFile(response, file) {
  fs.readFile(file, 'binary', function(err, file) {
    if (err) {
      response.writeHead(500, {
        'Content-Type': 'text/plain'
      });
      response.write(err + '\n');
    } else {
      response.writeHead(200, {
        'Content-Type': 'text/html'
      });
      response.write(file, 'binary');
    }

    response.end();
  });
}

let url = require('url');
http.createServer(function(request, response) {
  let uri = url.parse(request.url).href;

  switch (uri) {
    /**
     * Usage:
     * curl -H "Content-Type: text/plain" -d 'your_message_here' localhost:3000/api/send
     */
    case '/api/send':
      let body = '';
      request.on('data', chunk => {
        body += chunk;
      });
      request.on('end', () => {
        receivedMessageEmitter.emit('newMessage', body);
        db.insert(body);

        response.writeHead(200, {
          'Content-Type': 'text/plain'
        });
        response.write('sent');
        response.end();
      });
      break;
    case '/':
      serveFile(response, 'public/index.html');
      break;
    default:
      serveFile(response, 'public/' + uri);
  }
}).listen(3000);

console.log('You have a server on port 3000');
