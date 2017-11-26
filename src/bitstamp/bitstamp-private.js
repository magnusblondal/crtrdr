let Bitstamp = require('./bitstamp');

class PrivateBitstamp extends Bitstamp{
  constructor(signature) {
    super();
    this.signature = signature;
  }

  balance(err, callback){
    this._post(this.url.balance, callback);
  }
}

module.exports = PrivateBitstamp;