
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

module.exports = {reduceColor, reduceName, reduceCounter};
