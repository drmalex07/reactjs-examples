const Redux = require('redux');
const ReduxLogger = require('redux-logger');
const ReduxThunk = require('redux-thunk');

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

var reduceTimestamps = function (state={}, action)
{
  switch (action.type) {
  case 'ASK_TIME':
    return {
      finished: false,
      time: state.time,
      serverTime: state.serverTime,
    };
  case 'SET_TIME':
    return {
      finished: true,
      time: action.time,
      serverTime: action.serverTime,
    };
  default:
    return state;
  }
};

var rootReducer = Redux.combineReducers({
  color: reduceColor,
  value: reduceCounter,
  name: reduceName,
  receivedTime: reduceTimestamps,
});

//
// Create and configure store
//

var initialState = {
  color: '#575A60',
  value: 1,
  name: 'SuperNova',
  receivedTime: {
    time: null, 
    serverTime: null,
  }
};

var middleware = [
  ReduxThunk.default,  // lets us dispatch functions
  ReduxLogger.default, // log actions, always last in middleware chain
];

var store = Redux.createStore(
  rootReducer,
  initialState,
  Redux.applyMiddleware(...middleware));

// Export

module.exports = store;
