
//import Pusher from "pusher-js";
//import Pairs from "./src/pairs";

const Pusher = require( "pusher-js");
const Pairs = require ("./src/pairs");

const PUSHER_KEY = 'de504dc5763aeef9ff52';

const pusher = new Pusher(PUSHER_KEY);



let monkey = function(pair) {
  const ticker = pair.substring(0, 3).toUpperCase();
  const price = pair.substring(3, 6).toUpperCase();
  console.log(pair + ' ' + ticker + ' ' + price);

  return function(data) {
    const n = '(' + data.timestamp + ') ' + data.id + ': ' + data.amount + ' ' + ticker + ' @ ' + data.price + ' ' + price + ' ' + data.type;
    console.log(n);
  }
}

let trades = function(pair) {
  const channel = pair === Pairs.BTC_USD
    ? 'live_trades'
    : 'live_trades_' + pair;
  const tradesChannel = pusher.subscribe(channel);


  tradesChannel.bind('trade', monkey(pair));

  /*const ticker = pair.substring(0, 3).toUpperCase();
  const price = pair.substring(3, 6).toUpperCase();
  console.log(pair + ' ' + ticker + ' ' + price);
  tradesChannel.bind('trade', function (data) {
    const n = '(' + data.timestamp + ') ' + data.id + ': ' + data.amount + ' ' + ticker + ' @ ' + data.price + ' ' + price + ' ' + data.type;
    console.log(n);
  });
  */
};

trades(Pairs.ETH_USD);

//trades(Pairs.LTC_BTC);
trades(Pairs.BTC_USD);

