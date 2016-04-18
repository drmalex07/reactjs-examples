var React = require('react');
var ReactDOM = require('react-dom');

React.addons || (React.addons = {});
React.addons.PureRenderMixin = require('react-addons-pure-render-mixin');

var ReactRouter = require('react-router');
var ReactBootstrap = require('react-bootstrap');

global.React = React;
global.ReactDOM = ReactDOM;
global.ReactRouter = ReactRouter;
global.ReactBootstrap = ReactBootstrap;
