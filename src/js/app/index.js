const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');

const _ = require('lodash');

module.exports = function makeApp(conf)
{
  const env = conf.env;
  
  const app = express();
  
  //
  // Connect to database, load models
  //
  
  const db = require('./models/index')(conf.database[env]); 

  //
  // Configure and define middleware
  //

  app.use(logger('combined'));
  
  const sessionOpts = require('./configure-session')(session, conf.session);
  app.use(session(sessionOpts));
  
  conf.docRoot.forEach((p) => {
    app.use(express.static(p, {maxAge: '1d'})); // serve static content
  });

  app.use(bodyParser.json()); // parse application/json
  app.use(bodyParser.urlencoded({extended: true})); // parse application/x-www-form-urlencoded
 
  const passportStrategy = require('./make-passport-strategy')(db);
  passport.use(passportStrategy);
  passport.serializeUser((user, done) => done(null, user));   // store as plain object 
  passport.deserializeUser((user, done) => done(null, user)); // restore as plain object
  
  app.use(passport.initialize()); // passport middleware
  app.use(passport.session()); // make passport session-aware

  //
  // Define request handlers
  //

  app.post('/login', passport.authenticate('local', { 
    successRedirect: '/',
    failureRedirect: '/login', 
  }));
  
  app.post('/logout', function (req, res) {
    req.logout();
    res.redirect('/'); // or maybe redirect to a dedicated logged-out page
  });

  app.get('/', function (req, res) {
    res.redirect('/example.html');
  });

  app.get('/api/action/echo', function (req, res) {
    res.json({message: (req.query.message || null)});
  });

  app.post('/api/action/echo', function (req, res) {
    res.json({message: (req.body.message || null)});
  });

  app.get('/api/action/get-profile', function (req, res) {
    req.session.counter = (req.session.counter || 0) + 1;
    res.json({
      user: req.user || null,
      visits: req.session.counter,
    });
  });
  
  var messages = new Map([
    ['en', require('../i18n/en/messages.json')],
    ['el', require('../i18n/el/messages.json')],
  ]);

  app.get('/api/action/get-messages', function (req, res) {
    var locale = req.query.locale;
    if (!_.isEmpty(locale) && messages.has(locale)) {
      res.json(messages.get(locale));
    } else {
      res.status(404).send();
    }
  });

  return app;
};
