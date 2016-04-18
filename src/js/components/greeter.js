var React = global.React || require('react');
var ReactRedux = global.ReactRedux || require('react-redux');

// Presentational component

var Greeter = React.createClass({

  // Note: not needed, react-redux already checks for shallow equality 
  //mixins: [
  //  // This component should updated based on shallow equality of props+state
  //  React.addons.PureRenderMixin, // http://facebook.github.io/react/docs/advanced-performance.html 
  //],
  
  getDefaultProps: function ()
  {
    return {name: "World"};
  },

  render: function () 
  {
    console.info('Rendering <Greeter name="' + this.props.name + '">')
    var text = "Hello, " + this.props.name; 
    return (<p>{text}</p>);
  }
});

// Container component

const mapStateToProps = (state, ownProps) => ({
  name: state.name,
});

const mapDispatchToProps = null;

Greeter = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Greeter);

// Export

module.exports = Greeter;
