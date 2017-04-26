const express = require('express');
const router = new express.Router();

router.get('/', function(request, response) {
  response.render('index', {
    title: 'Node.js chat',
  });
});

module.exports = router;
