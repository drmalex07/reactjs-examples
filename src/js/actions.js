const {push: navigateTo} = require('react-router-redux'); 
const {flatten} = require('flat');

var actions = {

  // Router actions (intercepted by router middleware)
  
  navigateTo, // provides the illusion that is a normal redux action

  // Basic actions

  setLocale: (locale) => ({type: 'SET_LOCALE', locale}),
  
  loadMessages: (locale, messages) => ({type: 'LOAD_MESSAGES', locale, messages}),
  
  requestMessages: (locale) => ({type: 'REQUEST_MESSAGES', locale}),
  
  changeColor: (color) => ({type: 'CHANGE_COLOR', targetColor: color}),
  
  incrCounter: () => ({type: 'INCR'}),

  decrCounter: () => ({type: 'DECR'}),

  // Thunk actions
  
  fetchMessages: (locale) => (dispatch, getState) => {
    dispatch(actions.requestMessages(locale));
    return fetch('api/action/get-messages?locale=' + locale)
      .then(r => r.json())
      .then(r => dispatch(actions.loadMessages(locale, flatten(r))));
  },
  
  changeLocale: (locale) => (dispatch, getState) => (
    dispatch(actions.fetchMessages(locale))
      .then(
        () => dispatch(actions.setLocale(locale)),
        (err) => console.warn("No messages for locale " + locale))
  ),
};

module.exports = actions;
