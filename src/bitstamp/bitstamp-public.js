let Bitstamp = require('./bitstamp');

class PublicBitstamp extends Bitstamp{
  constructor() {
    super();
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
}

module.exports = PublicBitstamp;