var React = require('react');
var ReactDOM = require('react-dom');

React.addons || (React.addons = {});
React.addons.PureRenderMixin = require('react-addons-pure-render-mixin');

global.React = React;
global.ReactDOM = ReactDOM;
