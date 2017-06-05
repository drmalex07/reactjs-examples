var React = require('react');

var Greeter = require('./greeter');
var Counter = require('./counter');

class Root extends React.Component 
{  
  render()
  {
    return (
      <div>
        <section id='section-1'>
          <h3>Section #1</h3>
          <Greeter />
        </section>

        <section id='section-2'>
          <h3>Section #2</h3>
          <Counter/>
        </section>
      </div>
    );
  }
};

module.exports = Root;
