//var ReactRedux = require('react-redux');

var Root = require('./components/root.js');
var store = require('./store.js');

var Provider = ReactRedux.Provider;

var renderRoot = function (placeholder) 
{
  var root = (
    <Provider store={store}>
      <Root />
    </Provider>
  );
  ReactDOM.render(root, placeholder);
};

module.exports = {
  Root: Root,
  renderRoot: renderRoot,
  store: store,
}
