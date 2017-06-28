const React = require('react');
const {IntlProvider} = require('react-intl');

var messages = require('../i18n/messages');

var ContentRoot = require('./content-root');

class Root extends React.Component
{  
  render()
  {
    var {name, locale} = this.props;
    return (
      <IntlProvider locale={locale} messages={messages[locale]}>
        <ContentRoot name={name} />
      </IntlProvider>
    );
  }
}

Root.defaultProps  = {
  locale: 'el',
  name: 'World',
};

module.exports = Root;
