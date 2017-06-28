var React = require('react');
var {FormattedMessage} = require('react-intl');

// Note:
// Extend React.PureComponent to update component based on shallow equality of props+state

class Greeter extends React.PureComponent {
  
  constructor(props)
  {
    super(props);
  }
  
  render() 
  {
    console.info('About to render <Greeter/>...');
    return (
      <p>
        <FormattedMessage 
          id="greeting.welcome"
          values={{name: this.props.name}}
        />
      </p>);
  }
}

Greeter.defaultProps = {
  name: 'World',
};

module.exports = Greeter;
