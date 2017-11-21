const axios = require('axios');
const qs = require('querystring');
const ora = require('ora');

Get = function(url, handler) {
  const spinner = ora('Loading data').start();
  axios.get(url)
    .then(function (response) {
      spinner.stop();
      handler(response);
    });
};

module.exports = Get;