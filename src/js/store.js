//var Redux = require('redux');

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

var reduceTimestamps = function (state={}, action)
{
  switch (action.type) {
    case 'ASK_TIME':
      return {
        finished: false,
        time: state.time,
        serverTime: state.serverTime,
      };
      break;
    case 'SET_TIME':
      return {
        finished: true,
        time: action.time,
        serverTime: action.serverTime,
      };
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
  receivedTime: reduceTimestamps,
});

var initialState = {
  color: '#dedede',
  value: 0,
  name: 'Supernova',
  receivedTime: {
    time: null, 
    serverTime: null,
  }
};

var store = Redux.createStore(rootReducer, initialState);

module.exports = store;
