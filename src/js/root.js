const React = require('react');
const ReactDOM = require('react-dom');

const Root = require('./components/root.js');

var renderRoot = function (placeholder) 
{
  var name = window.location.hash.substr(1);
  ReactDOM.render(<Root name={name}/>, placeholder);
};

module.exports = {renderRoot};
