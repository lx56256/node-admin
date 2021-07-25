const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router()
const { Result } = require('../model/result')

let imgUrl = ''
let imgPath = ''
const storage = multer.diskStorage({
  destination: function(req, file, callback) {
    imgPath = path.resolve(__dirname, '../upload-img');
    callback(null, path.join(__dirname, '../upload-img'));
  },
  filename: function(req, file, callback) {
    const resetFileName = file.originalname.replace(/.*.(png|bmp|jpg|jpeg|gif)/g, `${Date.now()}.$1`)
    imgUrl = resetFileName;
    callback(null, resetFileName);
  }
})

const upload = multer({ storage, storage })

router.post('/upload', upload.single('file'), function(req, res) {
  if (req.file) {
    console.log(imgUrl)
    new Result({imageUrl: `https://lixu365.com/upload-img/${imgUrl}`}, '上传成功').success(res);
  } else {
    new Result('上传失败').fail(res);
  }
})

module.exports = router;
