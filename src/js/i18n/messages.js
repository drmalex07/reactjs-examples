const ReactIntl = require('react-intl');

// Add locale-specific data for each supported locale

ReactIntl.addLocaleData(require('react-intl/locale-data/en'));
ReactIntl.addLocaleData(require('react-intl/locale-data/el'));

// Add translated messages for each supported locale

module.exports = {
  'en': require('./messages/en'),
  'el': require('./messages/el'),
};
