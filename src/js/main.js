var {renderRoot} = require('./root');
var store = require('./store');
var actions = require('./actions');

var rootSelector = document.currentScript.getAttribute('data-root') || '#root';

var getName = () => window.location.hash.substr(1);

// Bind top-level event handlers

document.addEventListener("DOMContentLoaded", function () 
{
  var rootEl = document.querySelector(rootSelector);
  renderRoot(rootEl);
  
  // Push initial state to store
  store.dispatch(actions.updateName(getName()));
});

window.addEventListener('hashchange', function () 
{
  store.dispatch(actions.updateName(getName()));
});
