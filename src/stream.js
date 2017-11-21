const Pusher = require( "pusher-js");
const Pairs = require ("./pairs");

const PUSHER_KEY = 'de504dc5763aeef9ff52';
const pusher = new Pusher(PUSHER_KEY);

let handleEvent = function(pair) {
  const ticker = pair.substring(0, 3).toUpperCase();
  const price = pair.substring(3, 6).toUpperCase();
  console.log(pair + ' ' + ticker + ' ' + price);

  return function(data) {
    const n = '(' + data.timestamp + ') ' + data.id + ': ' + data.amount + ' ' + ticker + ' @ ' + data.price + ' ' + price + ' ' + data.type;
    console.log(n);
  }
};

let Stream = function(pair) {
  const channel = pair === Pairs.BTC_USD
    ? 'live_trades'
    : 'live_trades_' + pair;

  const tradesChannel = pusher.subscribe(channel);
  tradesChannel.bind('trade', handleEvent(pair));
};

module.exports = Stream;
