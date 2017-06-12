const React = require('react');
const PropTypes = require('prop-types');
const ReactRedux = require('react-redux');
const {Link, Switch, Route, Redirect} = require('react-router-dom');

const history = require('../history');
const routeInfo = require('../route-info');

const Home = require('./home');
const LoginForm = require('./login-form');
const RegisterForm = require('./register-form');
const ResetPasswordForm = () => (<p>Todo: Reset password</p>);

//
// Presentational component
//

class ContentRoot extends React.Component
{
  constructor(props)
  {
    super(props);
  }
 
  render() 
  {
    var authenticated = (this.props.user != null);
    
    if (!authenticated) {
      return (
        <Switch>
          <Route path="/login" name="login" component={LoginForm} />
          <Route path="/register" name="register" component={RegisterForm} />
          <Route path="/reset-password" name="reset-password" component={ResetPasswordForm} />
          <Redirect push={true} to="/login" />
        </Switch>
      );
    } else {
      return (
        <Route path="/" name="home" component={Home} />
      );
    }
  }
}

ContentRoot.propTypes = {
  user: PropTypes.shape({
    username: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    givenName: PropTypes.string,
  }),
};

//
// Container component
//

const mapStateToProps = (state, ownProps) => ({
  user: state.user.profile,  
});

const mapDispatchToProps = null;

ContentRoot = ReactRedux.connect(mapStateToProps, mapDispatchToProps)(ContentRoot);

module.exports = ContentRoot;
