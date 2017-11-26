const crypto = require('crypto-js');
const Http = require("./http");
const ora = require('ora');

class Bitstamp {
  constructor() {
    this.url = {
      base: "https://www.bitstamp.net/api/v2",
      balance: "https://www.bitstamp.net/api/v2/balance/",
      conversionRateEurUsd: "https://www.bitstamp.net/api/eur_usd/",
    }
  }

  ticker(currency_pair, err, callback) {
    const url = `${this.url.base}/ticker/${currency_pair}/`;
    this._get(url, callback);
  };

  hourlyTicker(currency_pair, err, callback) {
    const url = `${this.url.base}/ticker_hour/${currency_pair}/`;
    this._get(url, callback);
  };

  orderBook(currency_pair, err, callback) {
    const url = `${this.url.base}/order_book/${currency_pair}/`;
    this._get(url, callback);
  }

  transactions(currency_pair, timeframe='hour', err, callback) {
    const url = `${this.url.base}/transactions/${currency_pair}/?time=${timeframe}`;
    this._get(url, callback);
  }

  tradingPairsInfo(err, callback) {
    const url = `${this.url.base}/trading-pairs-info`;
    this._get(url, callback);
  }

  conversionRateEurUsd(err, callback) {
    this._get(this.url.conversionRateEurUsd, callback);
  }

  balance(err, callback){
    this._post(this.url.balance, callback);
  }

  _post(url, callback){
    const spinner = ora('Loading data').start();
    new Http(url).post(this._sign(), (response)=>{
      spinner.stop();
      callback(response.data);
    })
  }

  _get(url, callback){
    new Http(url).get((response)=>{
      callback(response.data);
    });
  }

  _sign() {
    const nonce = Date.now().valueOf();
    const message = nonce.toString() + this._config().user + this._config().key;
    const sign = crypto.HmacSHA256(message, this._config().secret);
    const signature = crypto.enc.Hex.stringify(sign).toUpperCase();

    return {
      signature: signature,
      key: this._config().key,
      nonce: nonce
    };
  }

  _config() {
    if(this.conf === undefined){
      this.conf = require('../config/config-bitstamp.json');
    }
    return this.conf;
  }
}

module.exports = Bitstamp;