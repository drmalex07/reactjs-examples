var moment = require('./moment-localized')

var HelloMessage = React.createClass({
  displayName: "HelloMessage",

  render: function render() {
    var text = "Hello from " + this.props.name + ", at " + moment().format(); 
    return React.createElement("span", null, text);
  }
});

module.exports = HelloMessage;
