const express = require('express');
const router = express.Router()
const { Result } = require('../model/result')
const { login } = require('../service/users');
const { body, validationResult } = require('express-validator');
const boom = require('boom');
const jwt = require('jsonwebtoken');
const { PRIVATE_KEY, JWT_EXPIRED } = require('../utils/constants');

router.get('/', function(req, res) {
  res.send('user...');
})

router.post('/login',[
  body('username').isString().withMessage('用户名必须为字符'),
  body('password').isString().withMessage('密码必须为字符'),
], function(req, res, next) {
  const err = validationResult(req);
  if (!err.isEmpty()) {
    const [{msg}] = err.errors;
    next(boom.badRequest(msg));
  } else {
    const { username, password } = req.body;
    login(username, password).then(result => {
      if (!result || result.length === 0) {
        new Result('登录失败').fail(res)
      } else {
        const token = jwt.sign(
          { username },
          PRIVATE_KEY,
          { expiresIn: JWT_EXPIRED }
        )
        new Result({ token }, '登录成功').success(res)
      }
    })
  }
  
})

router.get('/info', function(req, res) {
  res.send('user---info...');
})

module.exports = router