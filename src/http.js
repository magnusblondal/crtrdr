const axios = require('axios');
const querystring = require('querystring');

class Http {
  constructor(url) {
    this.url = url
  };

  get(handler) {
    axios.get(this.url)
      .then(function (response) {
        handler(response);
      });
  };

  post(body, handler) {
    axios.post(this.url, querystring.stringify(body))
    .then(function (response) {
        handler(response);
      });
  }
}

module.exports = Http;
