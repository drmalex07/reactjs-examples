var Greeter = require('./greeter');
var Timer = require('./timer');

var Root = React.createClass({

  render: function ()
  {
    return (
      <div>
        <Greeter name={this.props.name} />
        <Timer />
      </div>
    );
  }
});

module.exports = Root
