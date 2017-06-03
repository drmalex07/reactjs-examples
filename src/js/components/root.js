const React = require('react');
const {HashRouter, Route, Link, NavLink, IndexRoute} = require('react-router-dom');

var Greeter = require('./greeter');
var TodoList = require('./todo-list');
var Timer = require('./timer');
var Foo = require('./foo-portal');

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
          
          <ul className="menu">
            <li><NavLink to="/todos">Todos</NavLink></li>
            <li><NavLink to="/timer">Timer</NavLink></li>
            <li><NavLink to="/greet/λαλακης">Greet!</NavLink></li>
          </ul>
       
          <div className="content">
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
              component={() => (<Timer />)}
            />
            <Route path="/todos" 
              component={() => (<TodoList todos={this.state.todos} />)}
            />
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
