var React = global.React || require('react');

var Greeter = require('./greeter');
var TodoList = require('./todo-list');
var Timer = require('./timer');
var FooPortal = require('./foo-portal');

var Root = React.createClass({

  getDefaultProps: function ()
  {
    return {name: 'World'};
  },
  
  render: function ()
  {
    return (
      <div>
        <section id='sec-1'>
          <h3>Section #1</h3>
          <Greeter name={this.props.name} />
          <Timer />
        </section>
        <section id='sec-2'>
          <h3>Section #2</h3>
          <FooPortal name={this.props.name}/>
        </section>
        <section id='sec-3'>
          <h3>Section #3</h3>
          <TodoList todos={[
            {id: 1, text: 'Clean house'},
            {id: 2, text: 'Drink beer'},
           ]}/>
        </section>
      </div>
    );
  }
});

module.exports = Root
