//var Redux = require('redux');
var ReduxLogger = reduxLogger; //require('redux-logger');

// Reducers

var reduceColor = function (state='#9a9a9a', action) 
{
  switch (action.type) {
    case 'CHANGE_COLOR':
      return action.targetColor;
      break;
    default:
      return state;     
      break;
  }
};

var reduceCounter = function (state=0, action)
{
  switch (action.type) {
    case 'INCR':
      return state + 1;
      break;
    case 'DECR':
      return state - 1;
      break;
    default:
      return state;
      break;
  }
};

var reduceName = function (state='World', action)
{
  switch (action.type) {
    case 'CHANGE_NAME':
      return action.name;
      break;
    default:
      return state;
      break;
  }
}

var rootReducer = Redux.combineReducers({
  color: reduceColor,
  value: reduceCounter,
  name: reduceName,
});

// Create and configure store

var initialState = {
  color: '#575A60',
  value: 1,
  name: 'SuperNova',
};

var middleware = [
  ReduxLogger(),
];

var store = Redux.createStore(
  rootReducer,
  initialState,
  Redux.applyMiddleware(...middleware));

// Export

module.exports = store;
