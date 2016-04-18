var React = global.React || require('react');
var ReactRouter = global.ReactRouter || require('react-router');
var ReactBootstrap = global.ReactBootstrap || require('react-bootstrap');

var {Router, Route, IndexRoute, Link, hashHistory} = ReactRouter;
var {Nav, NavItem} = ReactBootstrap;

var Greeter = require('./greeter');
var TodoList = require('./todo-list');
var Timer = require('./timer');
var Foo = require('./foo-portal');

var RootMenu = React.createClass({
  
  render: function ()
  {
    return (
      <div>
        <Nav 
          bsStyle='pills'
          //activeHref={location.hash.split('?')[0]}
          activeHref={'#' + this.props.location.pathname}
         >
          <NavItem href="#/greet/World">Welcome</NavItem>
          <NavItem href="#/foo/Baz">Foo</NavItem>
          <NavItem href="#/timer">Timer</NavItem>
          <NavItem href="#/todos">Todos</NavItem>
        </Nav>
        {this.props.children}
      </div>
    );    
  },
}); 

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
        <Route path="/" component={RootMenu}>
          <IndexRoute
            component={() => (<p>About <i>something</i></p>)} 
           />
          <Route 
            path="foo/:name"
            component={({params}) => (<Foo name={params.name} prefix={this.props.fooPrefix} />)}
           />
          <Route 
            path="greet/:name" 
            component={({params}) => (<Greeter name={params.name} />)}
           />
          <Route 
            path="timer" 
            component={() => (<Timer />)}
           />
          <Route 
            path="todos" 
            component={() => (<TodoList todos={this.state.todos} />)}
           />
        </Route>
      </Router>
    );
  },

});

module.exports = Root
