
var actions = {

  // Plain actions

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

  // Complex actions: functions processed by thunk middleware
  
  refreshTime: () => (dispatch, getState) => {
    // Fetch time from server's "Date" header
    dispatch(actions.askTime());
    fetch('/api/action/echo')
      .then(res => (new Date(res.headers.get('Date'))))
      .then(res => (dispatch(actions.setTime(res, new Date()))));
  },

};

module.exports = actions;
