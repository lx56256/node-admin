const mysql = require('mysql');
const { debug } = require('../utils/constants');
const { host, user, password, database } = require('./config');

function connect() {
  return mysql.createConnection({
    host,
    user,
    password,
    database
  })
}

function querySql(sql) {
  const con = connect();
  return new Promise((resolve, reject) => {
    try {
      con.query(sql, (err, results) => {
        if (err) {
          debug && console.log('查询失败原因1', JSON.stringify(err))
          reject(err)
        } else {
          resolve(results)
        }
      })
    } catch (error) {
      debug && console.log('失败原因2', JSON.stringify(error));
      reject(error)
    } finally {
      con.end();
    }
  })
}

module.exports = {
  querySql
}

