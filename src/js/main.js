var {renderRoot} = require('./root');
var store = require('./store');
var actions = require('./actions');

var rootSelector = document.currentScript.getAttribute('data-root') || '#root';

// Bind top-level event handlers

document.addEventListener("DOMContentLoaded", function ()
{
  var rootEl = document.querySelector(rootSelector);
  
  // Push preliminary actions to store, then render

  Promise.resolve()
    .then(() => store.dispatch(actions.changeLocale('en')))
    .then(() => renderRoot(rootEl));

});
