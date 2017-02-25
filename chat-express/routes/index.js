let express = require('express');
let router = express.Router();

router.get('/', function (request, response) {
  response.render('index', {
    title: 'Node.js chat'
  });
});

module.exports = router;
