
const stream = require('./src/stream');
const pairs = require ("./src/pairs");
const get = require ("./src/get");
const bit = require('./src/bitstamp');

console.log('hoho')
// stream(pairs.BTC_USD);

// get(pairs.BTC_USD);

const timeframe = {
  minute: 'minute',
  hour: 'hour',
  day: 'day'
};

const b = new bit();
b.ticker(pairs.BTC_USD);
// b.orderBook(pairs.BTC_USD);
// b.hourlyTicker(pairs.BTC_USD);
// b.transactions(pairs.BTC_USD, timeframe.minute);
// b.conversionRateEurUsd();