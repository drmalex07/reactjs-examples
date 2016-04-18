var React = global.React || require('react');
var ReactBootstrap = global.ReactBootstrap || require('react-bootstrap');

var Greeter = require('./greeter');
var Timer = require('./timer');

var {Nav, NavItem, Tabs, Tab} = ReactBootstrap;

var SimpleTabs = React.createClass({

  getInitialState: function ()
  {
    return {activeKey: 'greeter'};
  },
  
  render: function ()
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
    
    var navtab = (
      <Nav
        bsStyle="pills"
        activeKey={this.state.activeKey} 
        onSelect={(k) => (this.setState({activeKey: k}))}
       >
        <NavItem eventKey="greeter">{'Greet'}</NavItem>
        <NavItem eventKey="timer">{'Timer'}</NavItem>
        <NavItem eventKey="lorem-ipsum">{'Lorem Ipsum'}</NavItem>
      </Nav>
    );

    return (
      <div>
        {navtab}
        <div className="tab-content">
          {tabs.get(this.state.activeKey)()}
        </div>
      </div>
    );
  },
});

// Export

var Root = SimpleTabs;

module.exports = Root
