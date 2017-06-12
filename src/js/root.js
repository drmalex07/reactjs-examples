const React = require('react');
const ReactDOM = require('react-dom');
const ReactRedux = require('react-redux');

const store = require('./store.js');

const Root = require('./components/root.js');

var renderRoot = function (placeholder) 
{
  ReactDOM.render(
    <ReactRedux.Provider store={store}>
      <Root />
    </ReactRedux.Provider>, 
    placeholder);
};

module.exports = {renderRoot, Root};
