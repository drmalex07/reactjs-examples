var Root = require('./components/root.js');
var actions = require('./actions.js');
var store = require('./store.js');

var renderRoot = function (placeholder) 
{
  var props = store.getState();
  ReactDOM.render(<Root {...props}/>, placeholder);
};

module.exports = {Root, renderRoot, store, actions}