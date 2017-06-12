const React = require('react');
const {HashRouter, Route, Switch, Link, NavLink} = require('react-router-dom');

const history = require('../history');

const Greeter = require('./greeter');
const Counter = require('./counter');
const TodoList = require('./todo-list');
const Timer = require('./timer');
const Foo = require('./foo-portal');

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
    {
      path: '/counter',
      title: 'Counter',
    }
  ];
  return (
    <ul className="menu">
      {
        links.map(link => {
          var active = location.pathname == link.path;
          return (
            <li key={link.path} className={active? 'active' : ''}>
              {active? (link.title) : (<NavLink to={link.path}>{link.title}</NavLink>)}
            </li>
          );
        })
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
    
    var Foo1 = ({match}) => (<Foo name={match.params.name} prefix={this.props.fooPrefix} />); 

    return (
      <HashRouter history={history}>
        <div className="root"> {/* a router has a single skeletal child */}
          
          <Route path="/" component={RootMenu} />

          <div className="content">
            <Switch> {/* match only 1st of following routes */}
              <Route exact={true} path="/" component={() => (<p>About <i>something</i></p>)} />
              <Route path="/foo/:name" component={Foo1} />
              <Route path="/greet/:name" component={({match}) => (<Greeter name={match.params.name} />)} />
              <Route path="/timer" component={Timer} />
              <Route path="/todos" component={() => (<TodoList todos={this.state.todos} />)} />
              <Route path="/counter" component={Counter} />
              <Route path="/home" component={() => (<p>Home Sweet home!</p>)} />
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
