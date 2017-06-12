const React = require('react');
const ReactRedux = require('react-redux');

const actions = require('../actions');

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
    return (
      <div>
        <p>{text}</p>
        <p>
          {/* An example of navigating via Redux action */}
          <button onClick={this.props.navigateToHome}>{'Navigate (via Redux action) to home'}</button>
        </p>
      </div>
    );
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

const mapDispatchToProps = (dispatch, ownProps) => ({
  navigateToHome: () => dispatch(actions.navigateTo('/home')),
});

Greeter = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(Greeter);

// Export

module.exports = Greeter;
