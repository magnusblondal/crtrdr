const get = require('./get');

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


}

module.exports = Bitstamp;