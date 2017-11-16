
import Pusher from "pusher-js";

const PUSHER_KEY = 'de504dc5763aeef9ff52';

const pusher = new Pusher(PUSHER_KEY);

const Pairs= {
  BTC_USD: 'btcusd',
  BTC_EUR: 'btceur',
  EUR_USD: 'eurusd',
  XPR_USD: 'xrpusd',
  XPR_EUR: 'xrpeur',
  XPR_BTC: 'xrpbtc',
  LTC_USD: 'ltcusd',
  LTC_EUR: 'ltceur',
  LTC_BTC: 'ltcbtc',
  ETH_USD: 'ethusd',
  ETH_EUR: 'etheur',
  ETH_BTC: 'ethbtc'
};

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

