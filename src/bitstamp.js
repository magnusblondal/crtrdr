const crypto = require('crypto-js');
const Http = require("./http");
const ora = require('ora');

class Bitstamp {
  constructor() {
    this.tickerUrl = `https://www.bitstamp.net/api/v2/ticker/`;
    this.baseUrl = `https://www.bitstamp.net/api/v2`;
  }

  ticker(currency_pair, err, callback) {
    const url = `${this.baseUrl}/ticker/${currency_pair}/`;
    this._get(url, callback);
  };

  hourlyTicker(currency_pair, err, callback) {
    const url = `${this.baseUrl}/ticker_hour/${currency_pair}/`;
    this._get(url, callback);
  };

  orderBook(currency_pair, err, callback) {
    const url = `${this.baseUrl}/order_book/${currency_pair}/`;
    this._get(url, callback);
  }

  transactions(currency_pair, timeframe='hour', err, callback) {
    const url = `${this.baseUrl}/transactions/${currency_pair}/?time=${timeframe}`;
    this._get(url, callback);
  }

  tradingPairsInfo(err, callback) {
    const url = `${this.baseUrl}/trading-pairs-info`;
    this._get(url, callback);
  }

  conversionRateEurUsd(err, callback) {
    const url = `https://www.bitstamp.net/api/eur_usd/`;
    this._get(url, callback);
  }

  _get(url, callback){
    new Http(url).get((response)=>{
      callback(response.data);
    });
  }

  balance(callback){
    const url = "https://www.bitstamp.net/api/v2/balance/";
    const spinner = ora('Loading data').start();

    new Http(url).post(this._sign(), (response)=>{
      spinner.stop();
      callback(response.data);
    })
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