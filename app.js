const events = require('events');
const receivedMessageEmitter = new events.EventEmitter();

const requests = [];
receivedMessageEmitter.on('newMessage', function(message) {
  // TODO: 4 - events
  // TODO: 5 - long pooling
});

// TODO: 0 - HTTP server
const http = require('http');
http.createServer(handleRequest).listen(3000);
console.log('You have a server on port 3000');

const db = require('./components/database');
const url = require('url');
function handleRequest(request, response) {
  let uri = url.parse(request.url).href;

  switch (uri) {
    case '/api/messages/send':
      // TODO: 3 - read request data
      readBody(request, body => {
        db.insert(body);
        // TODO: 4 - events
        // TODO: 1 - send response
      });
      break;
    case '/api/messages/pool':
      requests.push(response);
      break;
    case '/api/messages/all':
      // TODO: 1 - send response
      break;
    case '/':
      // TODO: 2 - serving static files
      serveFile(response, 'public/index.html');
      break;
    default:
      // TODO: 2 - serving static files
      serveFile(response, 'public/' + uri);
  }
}
