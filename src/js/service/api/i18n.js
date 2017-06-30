const fetch = require('fetch');
const URLSearchParams = require('url-search-params');

const checkStatus = require('../../util/check-fetch-status');

const credentials = 'same-origin'; // always send cookies!

var api = {

  getMessages: (locale) => {
    
    var q = new URLSearchParams();
    q.set('locale', locale);
    
    return fetch('/api/action/get-messages?' + q.toString(), {credentials})
      .then(checkStatus)
      .then(res => res.json());
  },

};

module.exports = api;
