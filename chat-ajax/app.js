const events = require('events');
let receivedMessageEmitter = new events.EventEmitter();

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

let requests = [];
receivedMessageEmitter.on('newMessage', function(message) {
  while (requests.length > 0) {
    let response = requests.shift();
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify([message]));
    response.end();
  }
});

let url = require('url');
http.createServer(function(request, response) {
  let uri = url.parse(request.url).href;

  switch (uri) {
    /**
     * Usage:
     * curl -H "Content-Type: text/plain" -d 'your_message_here' localhost:3000/api/messages/send
     */
    case '/api/messages/send':
      let body = '';
      request.on('data', chunk => {
        body += chunk;
      });
      request.on('end', () => {
        db.insert(body);
        receivedMessageEmitter.emit('newMessage', body);

        response.writeHead(200, {'Content-Type': 'text/plain'});
        response.write('sent');
        response.end();
      });
      break;
    case '/api/messages/pool':
    	requests.push(response);
      break;
    case '/api/messages/all':
      response.writeHead(200, {'Content-Type': 'application/json'});
      response.write(JSON.stringify(db.all()));
      response.end();
      break;
    case '/':
      serveFile(response, 'public/index.html');
      break;
    default:
      serveFile(response, 'public/' + uri);
  }
}).listen(3000);

console.log('You have a server on port 3000');
