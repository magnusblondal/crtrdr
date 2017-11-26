const get = require('./get');
const crypto = require('crypto-js');
const Http = require("./http");
const ora = require('ora');

class Bitstamp {
  constructor() {
    this.tickerUrl = `https://www.bitstamp.net/api/v2/ticker/`;
    this.baseUrl = `https://www.bitstamp.net/api/v2`;
  }

  ticker(currency_pair) {
    const url = `${this.baseUrl}/ticker/${currency_pair}/`;
    get(url, (response) => {
      console.log(response.data);
    })
  };

  hourlyTicker(currency_pair) {
    const url = `${this.baseUrl}/ticker_hour/${currency_pair}/`;
    get(url, (response) => {
      console.log(response.data);
    })
  };

  orderBook(currency_pair) {
    const url = `${this.baseUrl}/order_book/${currency_pair}/`;
    get(url, (response) => {
      console.log(response.data);
    });
  }

  transactions(currency_pair, timeframe='hour') {
    const url = `${this.baseUrl}/transactions/${currency_pair}/?time=${timeframe}`;
    get(url, (response) => {
      console.log(response.data);
    });
  }

  tradingPairsInfo() {
    const url = `${this.baseUrl}/trading-pairs-info`;
    get(url, (response) => {
      console.log(response.data);
    });
  }

  conversionRateEurUsd() {
    const url = `https://www.bitstamp.net/api/eur_usd/`
    get(url, (response) => {
      console.log(response.data);
    });
  }

  balance(callback){
    const url = "https://www.bitstamp.net/api/v2/balance/";
    const spinner = ora('Loading data').start();

    new Http(url).post(this.sign(), (response)=>{
      spinner.stop();
      callback(response.data);
    })
  }

  sign() {
    const nonce = Date.now().valueOf();
    const message = nonce.toString() + this.config().user + this.config().key;
    const sign = crypto.HmacSHA256(message, this.config().secret);
    const signature = crypto.enc.Hex.stringify(sign).toUpperCase();

    return {
      signature: signature,
      key: this.config().key,
      nonce: nonce
    };
  }

  config() {
    if(this.conf === undefined){
      this.conf = require('../config/config-bitstamp.json');
    }
    return this.conf;
  }
}

module.exports = Bitstamp;