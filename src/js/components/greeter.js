const React = require('react');
const ReactRedux = require('react-redux');
const {FormattedMessage} = require('react-intl');

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
    var {name} = this.props;
    return (
      <div>
        <p>
          <FormattedMessage id="greeting.welcome" values={{name}} />
        </p>
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
