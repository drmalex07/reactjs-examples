
var actions = {

  setLocale: (locale) => ({type: 'SET_LOCALE', locale}),
  
  loadMessages: (locale, messages) => ({type: 'LOAD_MESSAGES', locale, messages}),
  
  requestMessages: (locale) => ({type: 'REQUEST_MESSAGES', locale}),
  
  fetchMessages: (locale) => (dispatch, getState) => {
    dispatch(actions.requestMessages(locale));
    return fetch('api/action/get-messages?locale=' + locale)
      .then(r => r.json())
      .then(r => dispatch(actions.loadMessages(locale, r)));
  },
  
  changeLocale: (locale) => (dispatch, getState) => (
    dispatch(actions.fetchMessages(locale))
      .then(
        () => dispatch(actions.setLocale(locale)),
        (err) => console.warn("No messages for locale " + locale))
  ),

  updateName: (name) => ({type: 'CHANGE_NAME', name}),
  
  changeColor: (color) => ({type: 'CHANGE_COLOR', targetColor: color}),
  
  incrCounter: () => ({type: 'INCR'}),

  decrCounter: () => ({type: 'DECR'}),

};

module.exports = actions;
