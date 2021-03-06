const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const HttpStatus = require('http-status-codes');

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
  passport.serializeUser((user, done) => done(null, user.username));
  passport.deserializeUser((username, done) => {
    db.User.findById(username)
      .then((user) => {
        var {email, givenName, familyName} = user.get({plain: true});
        done(null, {username, email, givenName, familyName});
      })
      .catch((err) => done(err, false));
  });
  
  app.use(passport.initialize()); // passport middleware
  app.use(passport.session()); // make passport session-aware

  //
  // Define request handlers
  //
  
  app.post('/login', passport.authenticate('local'), function (req, res) {
    // after a successful login, regenerate session (prevent session fixation)
    var {passport} = req.session;
    req.session.regenerate((err) => {
      if (!err) {
        // Copy data to new session (passport, shopping basket etc.)
        Object.assign(req.session, {passport});
      }
      res.status(HttpStatus.NO_CONTENT).end();
    });
  });
  
  app.post('/logout', function (req, res) {
    req.session.destroy(() => {
      res.location('/').end();
    });
  });

  app.get('/', (req, res) => res.redirect('/index.html'));

  app.get('/api/action/echo', function (req, res) {
    res.json({message: (req.query.message || null)});
  });

  app.post('/api/action/echo', function (req, res) {
    res.json({message: (req.body.message || null)});
  });

  app.post('/api/action/user/profile/save', function (req, res) {
    if (req.user == null) {
      res.status(HttpStatus.UNAUTHORIZED).end();
      return;
    }
    var {username, email, givenName, familyName} = req.body;
    if (req.user.username != username) {
      res.send(HttpStatus.FORBIDDEN).end();
      return;
    }
    db.User.findById(username)
      .then((u) => u == null?
        Promise.reject('Cannot find user') :
        u.update({email, givenName, familyName}) 
      )
      .then(
        (u) => res.status(HttpStatus.CREATED).end(),
        (err) => res.status(HttpStatus.METHOD_FAILED).send(err)
      );
  });
  
  app.get('/api/action/user/profile', function (req, res) {
    if (req.user == null)
      res.status(HttpStatus.UNAUTHORIZED).end();
    else
      res.json({user: req.user});
  });

  return app;
};
