const Http = require("../http");
const ora = require('ora');

// abstract class
class Bitstamp {
  constructor(){
    if (new.target === Bitstamp) {
      throw new TypeError("Cannot construct Abstract instances directly");
    }
    this.url = {
      base: "https://www.bitstamp.net/api/v2",
      balance: "https://www.bitstamp.net/api/v2/balance/",
      conversionRateEurUsd: "https://www.bitstamp.net/api/eur_usd/",
    }
  }

  _post(url, callback){
    const spinner = ora('Loading data').start();
    new Http(url).post(this.signature(), (response)=>{
      spinner.stop();
      callback(response.data);
    })
  }

  _get(url, callback){
    new Http(url).get((response)=>{
      callback(response.data);
    });
  }
}

module.exports = Bitstamp;