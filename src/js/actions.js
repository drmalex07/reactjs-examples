
var actions = {

  updateName: (name) => ({type: 'CHANGE_NAME', name}),
  
  changeColor: (color) => ({type: 'CHANGE_COLOR', targetColor: color}),
  
  incrCounter: () => ({type: 'INCR'}),

  decrCounter: () => ({type: 'DECR'}),

};

module.exports = actions;
