const Redux = require('redux');
const ReduxLogger = require('redux-logger');
const ReduxThunk = require('redux-thunk');

const _ = require('lodash');

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

var reduceLocale = function (state="", action)
{
  switch (action.type) {
  case 'SET_LOCALE':
    return action.locale;
  default:
    return state;
  }
};

var reduceI18nMessages = function (state={}, action) {
  switch (action.type) {
  case 'REQUEST_MESSAGES':
    return state; // no-op
  case 'LOAD_MESSAGES':
    var {locale, messages} = action; 
    return _.assign({}, state, {[locale]: messages});
  default:
    return state;
  }

};

var rootReducer = Redux.combineReducers({
  locale: reduceLocale,
  i18n: Redux.combineReducers({
    messages: reduceI18nMessages,
  }),
  color: reduceColor,
  value: reduceCounter,
  name: reduceName,
});

//
// Create and configure store
//

var initialState = {};

var middleware = [
  ReduxThunk.default,  // lets us dispatch functions
  ReduxLogger.createLogger({colors: {}}), // log actions, always last in middleware chain
];

var store = Redux.createStore(
  rootReducer,
  initialState,
  Redux.applyMiddleware(...middleware));

// Export

module.exports = store;
