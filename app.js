const express = require('express');
const router = require('./router');
const fs = require('fs');
const https = require('https');
const path = require('path');
const bodyParser = require('body-parser');


const app = express();


app.all("*", function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://127.0.0.1:9527');
  res.header('Access-Control-Allow-Credentials', 'true');
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
const privateKey = fs.readFileSync(path.join(__dirname, './http/2_api.lixu365.com.key'), 'utf8');
const cert = fs.readFileSync(path.join(__dirname, './http/1_api.lixu365.com_bundle.crt'), 'utf8');
const credentials = {
  key: privateKey,
  cert,
}
function errHandle(err, req, res, next) {
  res.status(400).json({
    error: -1,
    msg: err.toString()
  })
}
app.use(errHandle)
const httpsServer = https.createServer(credentials, app)

httpsServer.listen(9000, function() {
  console.log('https已经启动在', 9000)
})

const server = app.listen(5000, function(){
  const { address, port } = server.address();
  console.log(`http已启动在${address}${port}`);
})