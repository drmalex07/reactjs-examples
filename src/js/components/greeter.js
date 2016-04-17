var Greeter = React.createClass({
  displayName: "Greeter",
  mixins: [
    // This component should updated based on shallow equality of props+state
    React.addons.PureRenderMixin, // http://facebook.github.io/react/docs/advanced-performance.html 
  ],
  
  getDefaultProps: function ()
  {
    return {name: "World"};
  },

  render: function () 
  {
    console.info('Rendering <Greeter name="'+this.props.name+'">')
    var text = "Hello, " + this.props.name; 
    return (<p>{text}</p>);
  }
});

module.exports = Greeter;
