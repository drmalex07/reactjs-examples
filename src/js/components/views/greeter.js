const React = require('react');
const {FormattedMessage} = require('react-intl');

class Greeter extends React.PureComponent {
  
  constructor(props)
  {
    super(props);
  }
  
  render() 
  {
    var {name} = this.props;

    return (
      <p>
        <FormattedMessage id="greeting.welcome" values={{name}} />
      </p>
    );
  }
}

Greeter.defaultProps = {
  name: 'World',
};

module.exports = Greeter;