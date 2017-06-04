const React = require('react');
const {HashRouter, Route, IndexRoute, Switch} = require('react-router-dom');
const {Nav, NavItem} = require('react-bootstrap');

var Greeter = require('./greeter');
var TodoList = require('./todo-list');
var Timer = require('./timer');
var Foo = require('./foo-portal');

const RootMenu = ({location}) => (
  <div>
    <Nav bsStyle='pills' activeHref={'#' + location.pathname}>
      <NavItem href="#/greet/World">Welcome</NavItem>
      <NavItem href="#/foo/Baz">Foo</NavItem>
      <NavItem href="#/timer">Timer</NavItem>
      <NavItem href="#/todos">Todos</NavItem>
    </Nav>
  </div>
); 

class Root extends React.Component {
 
  constructor(props)
  {
    super(props);
    
    this.state = {
      todos: [
        {id: 1, text: 'Clean house'},
        {id: 2, text: 'Drink beer'},
      ],
    };
  }
  
  render()
  {   
    // Note:
    // Provide target components as functional components (also gives access to 
    // lexical `this` holding <Root> instance).
    
    // Note:
    // The `match` prop passed to a target component contains matched 
    // parameters from route!
    
    return (
      <HashRouter>
        <div>
          <Route path="/" component={RootMenu} />
          
          <div className="content"> 
            <Switch> {/* match only 1st of following routes */}
              <Route exact={true} path="/"
                component={() => (<p>About <i>something</i></p>)} 
              />
              <Route path="/foo/:name"
                component={({match}) => (<Foo name={match.params.name} prefix={this.props.fooPrefix} />)}
              />
              <Route path="/greet/:name" 
                component={({match}) => (<Greeter name={match.params.name} />)}
              />
              <Route path="/timer" 
                component={Timer}
              />
              <Route path="/todos" 
                component={() => (<TodoList todos={this.state.todos} />)}
              />
            </Switch>
          </div>
        </div>
      </HashRouter>
    );
  }
};

Root.defaultProps = {
  fooPrefix: 'Foo',
};

module.exports = Root
