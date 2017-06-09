const React = require('react');
const { HashRouter, Link, Switch, Route, Redirect } = require('react-router-dom');
const { createBrowserHistory } = require('history');

const routeInfo = require('../route-info');
const Home = require('./home');
const LoginForm = require('./login-form');
const RegisterForm = require('./register-form');

const history = createBrowserHistory();

class Root extends React.Component 
{
  constructor(props)
  {
    super(props);
    
    this.state = {};
  }

  render() 
  {
    return (
      <HashRouter history={history}>
        <Switch>
          <Route path="/login" name="login" component={LoginForm} />
          <Route path="/register" name="register" component={RegisterForm} />
          <Route path="/" name="home" component={Home} />
        </Switch>
      </HashRouter>
    );
  }
}


module.exports = Root;
