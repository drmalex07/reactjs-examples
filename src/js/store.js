const Redux = require('redux');
const ReduxLogger = require('redux-logger');
const {routerMiddleware}  = require('react-router-redux');
const ReduxThunk = require('redux-thunk');

const {reduceColor, reduceCounter, reduceName, reduceLocale, reduceI18n} = require('./reducers');
const history = require('./history');

/* global process */
const env = process.env.NODE_ENV || 'development';

//
// Create and configure store
//

const rootReducer = Redux.combineReducers({
  locale: reduceLocale,
  i18n: reduceI18n, 
  color: reduceColor,
  value: reduceCounter,
  name: reduceName,
});

var initialState = {};

var middleware = [
  routerMiddleware(history), // intercept navigation actions
  ReduxThunk.default, // lets us dispatch functions
];

if (env == 'development') {
  // The logger middleware should always be last
  middleware.push(ReduxLogger.createLogger({colors: {}}));
}

var store = Redux.createStore(
  rootReducer, initialState, Redux.applyMiddleware(...middleware)
);

// Export

module.exports = store;
