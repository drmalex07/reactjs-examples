var Greeter = require('./greeter'),
    Timer = require('./timer'),
    FooPortal = require('./foo-portal.js');

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
      </div>
    );
  }
});

module.exports = Root
