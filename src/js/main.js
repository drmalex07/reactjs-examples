var _module = require('./index');

var rootSelector = document.currentScript.getAttribute('data-root') || '#root';

var actionForName = () => ({
  type: 'CHANGE_NAME', name: window.location.hash.substr(1),
});

var initializeState = function ()
{
  _module.store.dispatch(actionForName());
};

// Bind top-level event handlers

document.addEventListener("DOMContentLoaded", function () {
  var rootEl = document.querySelector(rootSelector);
  var renderRoot = _module.renderRoot.bind(window, rootEl);
  // Initialize central state
  initializeState();
  // Render now
  renderRoot();
});

window.addEventListener('hashchange', function () {
  _module.store.dispatch(actionForName());
});
