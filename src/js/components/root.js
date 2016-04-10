var Greeter = require('./greeter'),
    Timer = require('./timer'),
    FooPortal = require('./foo-portal.js');

var Root = React.createClass({

  // Lifecycle

  getInitialState: function ()
  {
    return {routePath: 'greet/World'};
  },
 
  getDefaultProps: function ()
  {
    return {fooPrefix: 'fooo'};
  },

  componentWillMount: function ()
  {
    var path = Root.getFragmentPath();
    if (!path) {
      Root.setFragmentPath(this.state.routePath);
    } else {
      this.setState({routePath: path});
    }  
  },

  componentDidMount: function ()
  {  
    window.addEventListener("hashchange", (ev) => {
      this.setState({routePath: Root.getFragmentPath()});
    });
  },

  render: function ()
  {
    // A simple top-level router based on regex match
   
    // Note: Use arrow functions for referencing lexical `this`
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
  },

  // Helpers

  statics: {
    getFragmentPath: function ()
    {
      return window.location.hash.substr(1);
    },
    setFragmentPath: function (path)
    {
      return (window.location.hash = path);
    },
  },
});

module.exports = Root
