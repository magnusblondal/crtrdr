const axios = require('axios');
const querystring = require('querystring');

class Http {
  constructor(url) {
    this.url = url
  };

  post(body, handler) {
    axios.post(this.url, querystring.stringify(body))
    .then(function (response) {
        handler(response);
      });
  }
}

module.exports = Http;
