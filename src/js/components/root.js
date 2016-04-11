var Greeter = require('./greeter');
var Counter = require('./counter');

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
        </section>
        <section id='sec-2'>
          <h3>Section #2</h3>
          <Counter value={this.props.value} color={this.props.color}/>
        </section>
      </div>
    );
  }
});

module.exports = Root
