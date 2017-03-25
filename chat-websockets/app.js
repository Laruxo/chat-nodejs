const http = require('http');
http.createServer(handleRequest).listen(3000);
console.log('You have a server on port 3000');

require('./components/websocket')();

const url = require('url');
function handleRequest(request, response) {
  const uri = url.parse(request.url).href;

  switch (uri) {
    case '/':
      serveFile(response, 'public/index.html');
      break;
    default:
      serveFile(response, 'public/' + uri);
  }
}

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
