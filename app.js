const events = require('events');
const receivedMessageEmitter = new events.EventEmitter();

const requests = [];
receivedMessageEmitter.on('newMessage', function(message) {
  while (requests.length > 0) {
    const response = requests.shift();
    response.writeHead(200, {'Content-Type': 'application/json'});
    response.write(JSON.stringify([message]));
    response.end();
  }
});

const http = require('http');
http.createServer(handleRequest).listen(8000);
console.log('You have a server on port 8000');

const url = require('url');
const db = require('./components/database');
/**
 * Handles incoming request.
 * @param {IncomingMessage} request
 * @param {ServerResponse} response
 */
function handleRequest(request, response) {
  const uri = url.parse(request.url).href;

  switch (uri) {
    /**
     * Can also be accessed from terminal:
     * curl -H "Content-Type: text/plain" -d 'your_message_here' localhost:3000/api/messages/send
     */
    case '/api/messages/send':
      readBody(request, body => {
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
}

/**
 * Reads the whole body and executes callback with it.
 * @param {IncomingMessage} request
 * @param {Function} callback
 */
function readBody(request, callback) {
  let body = '';
  request.on('data', chunk => body += chunk);
  request.on('end', () => callback(body));
}

const fs = require('fs');
/**
 * Serves a static html file. CSS and JS works too.
 * @param {ServerResponse} response
 * @param {string} file
 */
function serveFile(response, file) {
  fs.readFile(file, 'binary', function(err, file) {
    if (err) {
      response.writeHead(500, {'Content-Type': 'text/plain'});
      response.write(err + '\n');
    } else {
      response.writeHead(200, {'Content-Type': 'text/html'});
      response.write(file, 'binary');
    }

    response.end();
  });
}
