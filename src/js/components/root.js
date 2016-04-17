var React = global.React || require('react');
var ReactBootstrap = global.ReactBootstrap || require('react-bootstrap');

var Greeter = require('./greeter');
var Timer = require('./timer');

var Nav = ReactBootstrap.Nav, NavItem = ReactBootstrap.NavItem;

var Root = React.createClass({
  displayName: "Root",

  // Lifecycle

  getInitialState: function ()
  {
    return {activeKey: 'greeter'};
  },

  componentWillMount: function ()
  {
    console.info('About to mount <Root>')
  },
  
  componentWillMount: function ()
  {
    console.info('Mounted <Root>')
  },

  componentWillUnmount: function ()
  {
    console.info('About to unmount <Root>')
    // Cleanup
  },
  
  render: function ()
  {
    // Note: This is only an example, the same result (tabs) could be better
    // achieved with https://react-bootstrap.github.io/components.html#tabs
    
    var tabs = new Map([
      [
        'timer',
        React.createElement(Timer, null),
      ],
      [
        'lorem-ipsum',
        React.createElement('p', null, 'Lorem ipsum dolor sit amet, consectetur adipiscing elit'),
      ],
      [
        'greeter',
        React.createElement(Greeter, {name: this.props.name}),
      ],
    ]);

    var navtab = React.createElement(Nav, 
      {
        bsStyle: 'pills',
        activeKey: this.state.activeKey,
        onSelect: this._showPane,
      },
      React.createElement(NavItem, {eventKey: 'greeter'}, 'Greet'),
      React.createElement(NavItem, {eventKey: 'timer'}, 'Timer'),
      React.createElement(NavItem, {eventKey: 'lorem-ipsum'}, 'Lorem Ipsum')
    );

    return React.createElement('div', null, 
      navtab,
      React.createElement('div', 
        {className: 'tab-content'},
        tabs.get(this.state.activeKey))
    )
  },

  // Event handlers

  _showPane: function (key)
  {
    console.info('Switch to pane `' + key + '`...')
    this.setState({activeKey: key});
  },

});

module.exports = Root
