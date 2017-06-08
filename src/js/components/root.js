const React = require('react');
const { HashRouter, Link, Switch, Route, Redirect } = require('react-router-dom');
const { createBrowserHistory } = require('history');

const Header = require('./layout/header');
const Sidebar = require('./layout/sidebar');
const Breadcrumb = require('./layout/breadcrumb');
const Aside = require('./layout/aside');
const Footer = require('./layout/footer');

const Dashboard = require('./views/dashboard');
const Greeter = require('./views/greeter');

const history = createBrowserHistory();

class Root extends React.Component 
{
  render() {
    return (
      <HashRouter history={history}>
        <div className="app">
          <Header />
          <div className="app-body">
            <Sidebar {...this.props}/>
            <main className="main">
              {/* Fixme <Breadcrumb />*/}
              <div className="container-fluid">
                <Switch>
                  <Route path="/greet" name="Greeter" component={Greeter}/>
                  <Route path="/dashboard" name="Dashboard" component={Dashboard}/>
                  <Redirect from="/" to="/dashboard"/>
                </Switch>
              </div>
            </main>
            <Aside />
          </div>
          <Footer />
        </div>
      </HashRouter>
    );
  }
}

module.exports = Root;
