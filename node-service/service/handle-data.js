const { querySql } = require('../db');


function createData(params) {
  const { index_logo, type, item_logo, title, rich_text } = params;
  const sql = `insert into page_info_list (index_logo, type, item_logo, title, rich_text, create_time, modify_time) values ('${index_logo}', '${type}', '${item_logo}', '${title}', '${rich_text}', current_timestamp(), current_timestamp())`;
  return querySql(sql)
}

function modifyData(params) {
  const { index_logo, type, item_logo, title, rich_text, item_id } = params;
  const sql = `update page_info_list set index_logo='${index_logo}', type='${type}', item_logo='${item_logo}', title='${title}', rich_text='${rich_text}', modify_time=CURRENT_TIMESTAMP() where item_id=${item_id}`;
  return querySql(sql)
}

function deleteData(params) {
  const { item_id } = params;
  const sql = `delete from page_info_list where item_id=${item_id}`;
  return querySql(sql)
}

function getqueryData(params) {
  const { pageSize = 10, pageNumber = 0, type } = params;
  const sql = `select * from page_info_list ${type ? `where type='${type}'`: ''} limit ${pageSize} offset ${pageNumber}`;
  const countSql = `select count(*) totalCount from page_info_list ${type ? `where type='${type}'`: ''}`
  return Promise.all([querySql(sql), querySql(countSql)]);
}

function getqueryDetail({ item_id }) {
  const sql = `select * from page_info_list where item_id=${item_id}`;
  return querySql(sql)
}

module.exports = {
  createData,
  modifyData,
  deleteData,
  getqueryData,
  getqueryDetail,
}