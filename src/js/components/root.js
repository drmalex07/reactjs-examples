const React = require('react');
const {HashRouter, Route, Switch, Link, NavLink, IndexRoute} = require('react-router-dom');

var Greeter = require('./greeter');
var TodoList = require('./todo-list');
var Timer = require('./timer');

const RootMenu = ({location}) => {
  var links = [
    {
      path: "/todos", 
      title: "Todos",
    }, 
    {
      path: "/timer", 
      title: "Timer",
    }, 
    {
      path: "/greet/λαλακης", 
      title: "Greet!",
    },
  ];
  return (
    <ul className="menu">
      {
        links.map(link => (
          <li key={link.path} className={location.pathname == link.path? 'active' : ''}>
            <NavLink to={link.path}>{link.title}</NavLink>
          </li>
        ))
      } 
    </ul>
  );
};

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
        <div className="root"> {/* a router has a single skeletal child */}
          
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
}

Root.defaultProps = {
  fooPrefix: 'Foo',
};

module.exports = Root;
