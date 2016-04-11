//var Redux = require('redux');

var reduceColor = function (state='blue', action) 
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

var store = Redux.createStore(Redux.combineReducers({
  color: reduceColor,
  value: reduceCounter,
  name: reduceName,
}));

module.exports = store;
