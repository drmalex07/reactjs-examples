
var actions = {

  updateName: () => ({
    type: 'CHANGE_NAME',
    name: window.location.hash.substr(1),
  }),
  
  changeColor: (color) => ({type: 'CHANGE_COLOR', targetColor: color}),
  
  incrCounter: () => ({type: 'INCR'}),

  decrCounter: () => ({type: 'DECR'}),

};

module.exports = actions;
