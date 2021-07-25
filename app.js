const express = require('express');
const router = require('./router');
const bodyParser = require('body-parser');


const app = express();


app.all("*", function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:9527');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept');
  res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');

  if (req.method == 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
})
// app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router);
function errHandle(err, req, res, next) {
  res.status(400).json({
    error: -1,
    msg: err.toString()
  })
}
app.use(errHandle)
const server = app.listen(5000, function(){
  const { address, port } = server.address();
  console.log(`http已启动在${address}${port}`);
})