var _module = require('./index');

var rootSelector = document.currentScript.getAttribute('data-root') || '#root';

// Bind top-level event handlers

document.addEventListener("DOMContentLoaded", function () {
  var rootEl = document.querySelector(rootSelector);
  var renderRoot = _module.renderRoot.bind(window, rootEl);
  if (!window.location.hash)
    window.location.hash = 'World';
  window.addEventListener("hashchange", renderRoot);
  renderRoot();
});
