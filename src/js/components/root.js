var Greeter = require('./greeter');
var Timer = require('./timer');

var Root = React.createClass({
  displayName: "Root",

  render: function ()
  {
    return React.createElement('div', null,
      // Append children
      React.createElement(Greeter, {name: this.props.name}),
      React.createElement(Timer, null));
  }
});

module.exports = Root
