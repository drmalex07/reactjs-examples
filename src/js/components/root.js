var React = global.React || require('react');
var ReactRouter = global.ReactRouter || require('react-router');

var {Router, Route, IndexRoute, Link, hashHistory} = ReactRouter;

var Greeter = require('./greeter');
var TodoList = require('./todo-list');
var Timer = require('./timer');
var Foo = require('./foo-portal');

var Root = React.createClass({
 
  getInitialState: function ()
  {
    return {
      todos: [
        {id: 1, text: 'Clean house'},
        {id: 2, text: 'Drink beer'},
      ],
    };
  },
  
  getDefaultProps: function ()
  {
    return {fooPrefix: 'Booooo'};
  },

  render: function ()
  {   
    // Note #1:
    // Provide target components as functional components (also gives access to 
    // lexical `this` holding <Root> instance).
    // Note #2:
    // The `params` prop passed to target components always contains matched 
    // parameters from route!
    return (
      <Router history={hashHistory}>
        <Route 
          path="/"
          component={() => (<p>About <i>something</i></p>)} 
         />
        <Route 
          path="/foo/:name"
          component={({params}) => (<Foo name={params.name} prefix={this.props.fooPrefix} />)}
         />
        <Route 
          path="/greet/:name" 
          component={({params}) => (<Greeter name={params.name} />)}
         />
        <Route 
          path="/timer" 
          component={() => (<Timer />)}
         />
        <Route 
          path="/todos" 
          component={() => (<TodoList todos={this.state.todos} />)}
         />
      </Router>
    );
  },

});

module.exports = Root
