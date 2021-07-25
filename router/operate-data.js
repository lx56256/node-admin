const express = require('express');
const router = express.Router()
const { Result } = require('../model/result')
const {
  createData,
  modifyData,
  deleteData,
  getqueryData,
  getqueryDetail,
} = require('../service/handle-data');


router.post('/createPageData', function(req, res) {
  const { index_logo, type, item_logo, title, rich_text } = req.body;
  if (index_logo && type && item_logo && title && rich_text) {
    createData({
      index_logo,
      type, item_logo,
      title,
      rich_text,
    }).then(() => {
      new Result({success: true}, '创建成功').success(res)
    }).catch(err => {
      new Result(err, '创建失败').success(res)
    })
  } else {
    new Result('请检查参数').success(res)
  }
});


router.post('/modifyPageData', function(req, res) {
  const { index_logo, type, item_logo, title, rich_text, item_id } = req.body;
  console.log(req.body,9)
  if (index_logo && type && item_logo && title && rich_text && item_id) {
    modifyData({
      index_logo,
      type, item_logo,
      title,
      rich_text,
      item_id,
    }).then(() => {
      new Result({success: true}, '修改成功').success(res)
    }).catch(err => {
      new Result(err, '修改失败').success(res)
    })
  } else {
    new Result('请检查参数').success(res)
  }
});


router.post('/deletePageData', function(req, res) {
  const { item_id } = req.body;
  if (item_id) {
    deleteData({
      item_id
    }).then(() => {
      new Result({success: true}, '删除成功').success(res)
    }).catch(err => {
      new Result(err, '删除失败').success(res)
    })
  } else {
    new Result('请检查参数').success(res)
  }
});


router.get('/getQueryPageData', function(req, res) {
  getqueryData().then((result) => {
    new Result(result, '查询成功').success(res)
  }).catch(err => {
    new Result(err, '查询失败').success(res)
  })
});

router.get('/getQueryPageDetail', function(req, res) {
  const { item_id } = req.query;
  getqueryDetail({item_id}).then((result) => {
    new Result(result[0] || null, '查询成功').success(res)
  }).catch(err => {
    new Result(err, '查询失败').success(res)
  })
});


module.exports = router;

