const Redux = require('redux');
const _ = require('lodash');

function reduceColor(state='#9a9a9a', action) 
{
  switch (action.type) {
  case 'CHANGE_COLOR':
    return action.targetColor;
  default:
    return state;     
  }
}

function reduceCounter(state=0, action)
{
  switch (action.type) {
  case 'INCR':
    return state + 1;
  case 'DECR':
    return state - 1;
  default:
    return state;
  }
}

function reduceName(state='World', action)
{
  switch (action.type) {
  case 'CHANGE_NAME':
    return action.name;
  default:
    return state;
  }
}

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

module.exports = {
  
  reduceColor,
  reduceName, 
  reduceCounter,
  
  reduceLocale,
  reduceI18n: Redux.combineReducers({
    messages: reduceI18nMessages,  
  }),
};
