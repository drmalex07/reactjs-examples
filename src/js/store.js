const Redux = require('redux');
const ReduxLogger = require('redux-logger');

//
// Reducers
//

var reduceColor = function (state='#9a9a9a', action) 
{
  switch (action.type) {
  case 'CHANGE_COLOR':
    return action.targetColor;
  default:
    return state;     
  }
};

var reduceCounter = function (state=0, action)
{
  switch (action.type) {
  case 'INCR':
    return state + 1;
  case 'DECR':
    return state - 1;
  default:
    return state;
  }
};

var reduceName = function (state='World', action)
{
  switch (action.type) {
  case 'CHANGE_NAME':
    return action.name;
  default:
    return state;
  }
};

var rootReducer = Redux.combineReducers({
  color: reduceColor,
  value: reduceCounter,
  name: reduceName,
});

//
// Create and configure store
//

var initialState = {
  color: '#575A60',
  value: 1,
  name: 'SuperNova',
};

var middleware = [
  ReduxLogger.createLogger(), /* logger must be last in chain! */
];

var store = Redux.createStore(
  rootReducer,
  initialState,
  Redux.applyMiddleware(...middleware));

// Export

module.exports = store;
