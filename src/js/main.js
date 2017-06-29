var {renderRoot} = require('./root');
var store = require('./store');
var actions = require('./actions');

var rootSelector = document.currentScript.getAttribute('data-root') || '#root';

var getName = () => window.location.hash.substr(1);

// Bind top-level event handlers

document.addEventListener("DOMContentLoaded", function () 
{
  var rootEl = document.querySelector(rootSelector);
  
  // Push preliminary actions to store, then render

  Promise.resolve()
    .then(() => store.dispatch(actions.updateName(getName())))
    .then(() => store.dispatch(actions.changeLocale('en')))
    .then(() => renderRoot(rootEl));

});

window.addEventListener('hashchange', function () 
{
  store.dispatch(actions.updateName(getName()));
});
