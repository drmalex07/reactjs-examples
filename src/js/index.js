var Root = require('./components/root.js');
var store = require('./store.js');

var renderRoot = function (placeholder) 
{
  var props = store.getState();
  ReactDOM.render(<Root {...props}/>, placeholder);
};

module.exports = {
  Root: Root,
  renderRoot: renderRoot,
  store: store,
}
