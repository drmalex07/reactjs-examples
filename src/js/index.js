var React = global.React || require('react');
var ReactDOM = global.ReactDOM || require('react-dom');

var Root = require('./components/root.js');

var renderRoot = function (placeholder) 
{
  var name = window.location.hash.substr(1);
  ReactDOM.render(<Root name={name}/>, placeholder);
};

module.exports = {Root, renderRoot};
