
var actions = {

  updateName: () => ({
    type: 'CHANGE_NAME',
    name: window.location.hash.substr(1),
  }),
  
  changeColor: (color) => ({type: 'CHANGE_COLOR', targetColor: color}),
  
  incrCounter: () => ({type: 'INCR'}),

  decrCounter: () => ({type: 'DECR'}),

  askTime: () => ({type: 'ASK_TIME'}),

  setTime: (t, t1) => ({
    type: 'SET_TIME',
    time: t1.getTime(), // roughly corresponds to server time
    serverTime: t.getTime(),
  }),

};

module.exports = actions;
