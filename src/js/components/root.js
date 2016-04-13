var Greeter = require('./greeter');
var Counter = require('./counter');
var Clock = require('./clock');

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
        <section id='sec-3'>
          <h3>Section #3</h3>
          <Clock />
        </section>
      </div>
    );
  }
});

module.exports = Root
