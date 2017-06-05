const React = require('react');
const ReactRedux = require('react-redux');

//
// Define presentational component
//

class Greeter extends React.PureComponent {
  
  constructor(props)
  {
    super(props);
  }

  render() 
  {
    var text = "Hello, " + this.props.name; 
    return (<p>{text}</p>);
  }
}

Greeter.defaultProps = {
  name: 'World',
};

//
// Wrap into a container component
//

const mapStateToProps = (state, ownProps) => ({
  name: state.name,
});

const mapDispatchToProps = null;

Greeter = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Greeter);

// Export

module.exports = Greeter;
