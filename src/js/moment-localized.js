var moment = require('moment');

require('moment/locale/el');
require('moment/locale/es');

moment.locale('el'); // set global locale

module.exports = moment;
