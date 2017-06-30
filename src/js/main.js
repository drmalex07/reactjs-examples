const store = require('./store');
const {refreshProfile} = require('./actions/user');
const {changeLocale} = require('./actions/i18n');
const {renderRoot} = require('./root');

var rootSelector = document.currentScript.getAttribute('data-root') || '#root';

// Bind top-level event handlers

document.addEventListener("DOMContentLoaded", function () 
{
  var rootEl = document.querySelector(rootSelector);
  var locale = "en";

  // Chain preliminary actions before initial rendering
  
  Promise.resolve()
    .then(() => store.dispatch(changeLocale(locale)))
    .then(() => 
      store.dispatch(refreshProfile())
        .then(null, (err) => console.info('Cannot refresh user profile')))
    .then(() => renderRoot(rootEl));
});


// Provide development shortcuts

/* global process */
if (process.env.NODE_ENV != 'production') {
  global.$a = {
    store: store,
    api: require('./service/api/index'),
  };
}
