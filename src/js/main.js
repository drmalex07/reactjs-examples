var {renderRoot} = require('./root');

var rootSelector = document.currentScript.getAttribute('data-root') || '#root';

// Bind top-level event handlers

document.addEventListener("DOMContentLoaded", function () {
  var rootEl = document.querySelector(rootSelector);
  var _renderRoot = renderRoot.bind(window, rootEl);
  window.addEventListener("hashchange", _renderRoot);
  _renderRoot();
});
