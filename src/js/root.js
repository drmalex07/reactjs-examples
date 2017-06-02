const React = require('react');
const ReactDOM = require('react-dom');

const store = require('./store.js');
const Root = require('./components/root.js');

var renderRoot = function (placeholder) 
{
  var {name, value, color} = store.getState(); 
  ReactDOM.render(
    <Root name={name} value={value} color={color} />, 
    placeholder);
};

module.exports = {renderRoot};
