var Greeter = React.createClass({
  displayName: "Greeter",
  
  getDefaultProps: function ()
  {
    return {name: "World"};
  },

  render: function () 
  {
    var text = "Hello, " + this.props.name; 
    return React.createElement("p", null, text);
  }
});

module.exports = Greeter;
