const crypto = require('crypto-js');

let signature = function() {
  const nonce = Date.now().valueOf();
  const message = nonce.toString() + config().user + config().key;
  const sign = crypto.HmacSHA256(message, config().secret);
  const signature = crypto.enc.Hex.stringify(sign).toUpperCase();

  return {
    signature: signature,
    key: config().key,
    nonce: nonce
  };
}

let config = function() {
  if(this.conf === undefined){
    this.conf = require('../config/config-bitstamp.json');
  }
  return this.conf;
};

module.exports = signature;