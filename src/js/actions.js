
var actions = {

  updateName: (name) => ({type: 'CHANGE_NAME', name}),
  
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
