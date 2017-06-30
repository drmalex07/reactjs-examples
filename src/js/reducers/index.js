const Redux = require('redux');

const reduceConfig = require('./config');
const reduceUser = require('./user');
const reduceLocale = require('./locale');
const reduceI18n = require('./i18n');

module.exports = Redux.combineReducers({
  config: reduceConfig,
  locale: reduceLocale,
  i18n: reduceI18n,
  user: reduceUser,
});
