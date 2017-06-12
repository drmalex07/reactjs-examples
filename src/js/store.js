const Redux = require('redux');
const ReduxLogger = require('redux-logger');
const ReduxThunk = require('redux-thunk');
const {routerMiddleware}  = require('react-router-redux');

const rootReducer = require('./reducers/index');
const history = require('./history');

/* global process */
const env = process.env.NODE_ENV || 'development';

// Create and configure store

var middleware = [
  ReduxThunk.default, // lets us dispatch functions
  routerMiddleware(history), // intercept navigation actions
];

if (env == 'development') {
  // The logger middleware should always be last
  middleware.push(ReduxLogger.default);
}

var initialState = {};
var store = Redux.createStore(
  rootReducer, initialState, Redux.applyMiddleware(...middleware)
);

module.exports = store;
