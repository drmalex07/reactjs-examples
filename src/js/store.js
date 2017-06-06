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

// Define some custom middleware
// see http://redux.js.org/docs/advanced/Middleware.html

var makeLoggingMiddleware = function (options={level: 'log', prefix: 'before-and-after'}) 
{
  var log = (options.level == 'info')? console.info : console.log;
  log = log.bind(console);
  var prefix = 'redux/' + options.prefix;

  // Decorate (wrap) dispatch method for a given store
  return (store) => (
    // next is the dispatch method defined by the previous middleware
    // or the store itself (if no previous middleware exists)
    (next) => (
      // How should be an action be dispatched?
      // Log state before and after; dispatch to previous in chain
      (action) => {
        var result;
        console.group('[' + prefix + '] Received action: ', action);
        log('Before: ', store.getState());
        result = next(action);
        log('After: ', store.getState());
        console.groupEnd();
      }
    )
  );
};

//
// Create and configure store
//

var initialState = {
  color: '#575A60',
  value: 1,
  name: 'SuperNova',
};

var middleware = [
  makeLoggingMiddleware(),
  //ReduxLogger(),
];

var store = Redux.createStore(
  rootReducer,
  initialState,
  Redux.applyMiddleware(...middleware));

// Export

module.exports = store;
