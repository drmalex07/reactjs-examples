const React = require('react');
const ReactRedux = require('react-redux');
const ReactDOM = require('react-dom');

const store = require('./store');
const Root = require('./components/root.js');

var renderRoot = function (placeholder) 
{
  var root = (
    <ReactRedux.Provider store={store}>
      <Root />
    </ReactRedux.Provider>  
  );
  
  ReactDOM.render(root, placeholder);
};

module.exports = {renderRoot};
