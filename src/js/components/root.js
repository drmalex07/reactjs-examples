var React = global.React || require('react');

var Greeter = require('./greeter');
var Counter = require('./counter');

var Root = React.createClass({
  
  render: function ()
  {
    return (
      <div>
        <section id='sec-1'>
          <h3>Section #1</h3>
          <Greeter />
        </section>
        <section id='sec-2'>
          <h3>Section #2</h3>
          <Counter />
        </section>
      </div>
    );
  }
});

module.exports = Root
