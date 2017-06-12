const {push: navigateTo} = require('react-router-redux'); 

var actions = {

  // Router actions (intercepted by router middleware)
  
  navigateTo, // provides the illusion that is a normal redux action

  // Basic actions

  changeColor: (color) => ({type: 'CHANGE_COLOR', targetColor: color}),
  
  incrCounter: () => ({type: 'INCR'}),

  decrCounter: () => ({type: 'DECR'}),

  // Thunk actions
};

module.exports = actions;
