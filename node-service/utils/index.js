const jwt = require('jsonwebtoken');
const { PRIVATE_KEY } = require('./constants');

function decode(req) {
  let token = req.get('Authorization');
  if (token.indexOf('Bearer') === 0) {
    token = token.replace('Bearer ', '');
  }
  return jwt.verify(token, PRIVATE_KEY);
}

module.exports = {
  decode,
}