const expressJwt = require('express-jwt');
const { PRIVATE_KEY } = require('../utils/constants');


const jwtAuth = expressJwt({
  secret: PRIVATE_KEY,
  algorithms: ['HS256'],
  credentialsRequired: true,
}).unless({
  path: [
    '/',
    '/user/login',
  ],
});

module.exports = { jwtAuth };