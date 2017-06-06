const React = require('react');
const {Nav, NavItem, Tabs, Tab} =  require('react-bootstrap');

var Greeter = require('./greeter');
var TodoList = require('./todo-list');
var Timer = require('./timer');
var FooPortal = require('./foo-portal');

class Root extends React.Component
{
  constructor(props)
  {
    super(props);
    this.state = {activeKey: 'greeter'};
  } 

  render()
  {
    // Note: This is only an example, the same result (tabs) could be better
    // achieved with https://react-bootstrap.github.io/components.html#tabs
    
    var tabs = new Map([
      [
        'timer',
        () => (<Timer />),
      ],
      [
        'lorem-ipsum',
        () => (<p>Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>),
      ],
      [
        'greeter',
        () => (<Greeter name={this.props.name} />),
      ],
    ]);
    
    return (
      <div>
        <Nav bsStyle="pills"
          activeKey={this.state.activeKey} 
          onSelect={(k) => (this.setState({activeKey: k}))}
         >
          <NavItem eventKey="greeter">{'Greet'}</NavItem>
          <NavItem eventKey="timer">{'Timer'}</NavItem>
          <NavItem eventKey="lorem-ipsum">{'Lorem Ipsum'}</NavItem>
        </Nav>
        <div className="tab-content">
          {tabs.get(this.state.activeKey)()}
        </div>
      </div>
    );
  }
}

Root.defaultProps  = {
  name: 'World',
};

module.exports = Root;
