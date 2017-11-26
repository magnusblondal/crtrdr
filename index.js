
const stream = require('./src/stream');
const pairs = require ("./src/pairs");
const Bitstamp = require('./src/bitstamp');
const signer = require('./src/bitstamp-signature');

// stream(pairs.BTC_USD);

// get(pairs.BTC_USD);

const timeframe = {
  minute: 'minute',
  hour: 'hour',
  day: 'day'
};

const b = new Bitstamp(signer);
// b.ticker(pairs.BTC_USD, (err)=>{}, (data)=>{console.log(data)});
// b.orderBook(pairs.BTC_USD, (err)=>{}, (data)=>{console.log(data)});
// b.hourlyTicker(pairs.BTC_USD, (err)=>{}, (data)=>{console.log(data)});
// b.transactions(pairs.BTC_USD, timeframe.minute, (err)=>{}, (data)=>{console.log(data)});
// b.tradingPairsInfo((err)=>{}, (data)=>{console.log(data)});
// b.conversionRateEurUsd((err)=>{}, (data)=>{console.log(data)});
b.balance((err)=>{}, (data)=> {
  console.log(data);
});