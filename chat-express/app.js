let events = require('events');
let receivedMessageEmitter = new events.EventEmitter();
require('../websocket')(receivedMessageEmitter);

// HTTP server ------------------------------------------
let express = require('express');
let app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'pug');

const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(express.static('public'));

app.use('/', require('./routes/index'));

// catch 404 and forward to error handler
app.use(function(request, response, next) {
  let error = new Error('Not Found');
  error.status = 404;
  next(error);
});

// error handler
app.use(function(error, request, response) {
  // set locals, only providing error in development
  response.locals.message = error.message;
  response.locals.error = request.app.get('env') === 'development' ? error : {};

  // render the error page
  response.status(error.status || 500);
  response.render('error');
});

app.listen(3000, function() {
  console.log('You have a server on port 3000');
});
