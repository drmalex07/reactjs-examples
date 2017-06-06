const React = require('react');

var Greeter = require('./greeter');
var TodoList = require('./todo-list');
var Timer = require('./timer');
var FooPortal = require('./foo-portal');

class Root extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {routePath: 'greet/World'};
  }

  componentWillMount()
  {
    var path = Root.getFragmentPath();
    if (!path) {
      Root.setFragmentPath(this.state.routePath);
    } else {
      this.setState({routePath: path});
    }  
  }

  componentDidMount()
  {  
    // Listen to hashchange (ie route path) changes
    window.addEventListener("hashchange", (ev) => {
      this.setState({routePath: Root.getFragmentPath()});
    });
  }

  render()
  {
    // A simple top-level router based on regex match
   
    // Note: Using arrow functions for referencing lexical `this`
    
    var routes = [
      {
        pattern: /^foo\/(.*)$/,
        render: (name) => (
          <FooPortal name={name} prefix={this.props.fooPrefix} />
        ),
      },  
      {
        pattern: /^greet\/(.*)$/,
        render: (name) => (
          <Greeter name={name} />
        ),
      },
      {
        pattern: /^timer$/,
        render: () => (
          <Timer />
        ),
      },
      {
        pattern: /^todos$/,
        render: () => (
          <TodoList todos={[
            {id: 1, text: 'Clean house'},
            {id: 2, text: 'Drink beer'},
          ]}/>
        ),
      },
      // A catch-all route
      {
        pattern: /^.*$/,
        render: () => (
          <p>{'Cannot route to path!'}</p>
        ),
      }
    ];
    
    // Match route and delegate to it

    var match = null;
    for (var route of routes) {
      match = route.pattern.exec(this.state.routePath);
      if (match) {
        return route.render.apply(this, match.slice(1));  
      }
    }
  }

  // Helpers

  static getFragmentPath()
  {
    return window.location.hash.substr(1);
  }
  
  static setFragmentPath(path)
  {
    return (window.location.hash = path);
  }
}

Root.defaultProps  = {
  name: 'World',
  fooPrefix: 'fooo',
};

module.exports = Root;
