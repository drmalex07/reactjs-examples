const Redux = require('redux');
const ReduxLogger = require('redux-logger');
const {routerMiddleware}  = require('react-router-redux');

const {reduceColor, reduceCounter, reduceName} = require('./reducers');

const history = require('./history');

/* global process */
const env = process.env.NODE_ENV || 'development';

//
// Create and configure store
//

const rootReducer = Redux.combineReducers({
  color: reduceColor,
  value: reduceCounter,
  name: reduceName,
});

var initialState = {
  color: '#575A60',
  value: 1,
  name: 'SuperNova',
};

var middleware = [
  routerMiddleware(history), // intercept navigation actions
];

if (env == 'development') {
  // The logger middleware should always be last
  middleware.push(ReduxLogger.default);
}

var store = Redux.createStore(
  rootReducer, initialState, Redux.applyMiddleware(...middleware)
);

module.exports = store;
