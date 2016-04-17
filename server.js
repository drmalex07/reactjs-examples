var express = require('express');
var logger = require('morgan')
var reqparser = require('body-parser');
var app = express();

app.use(logger('combined'));

app.use(express.static('public/www'));

app.use(reqparser.json()); // for parsing application/json

app.get('/', function (req, res) {
  res.redirect('/example.html');
});

app.post('/api/action/echo', function (req, res) {
  res.json({message: req.body.message});
});

app.get('/api/action/get-state', function (req, res) {
  res.json({value: 0, name: 'Supernova', color: '#dedede'});
});

app.listen(3000, function () {
  console.info('Browse http://localhost:3000'); 
});

