const { querySql } = require('../db');

function login(username, password) {
  const sql = `select * from admin_user where username='${username}' and password='${password}'`;
  return querySql(sql)
}

function findUser(username) {
  const sql = `select username, id, role, nickname, avatar from admin_user where username='${username}'`;
  return querySql(sql)
}

module.exports = {
  login,
  findUser,
} 