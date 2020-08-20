const express = require('express');
const router = require('./router');
const fs = require('fs');
const https = require('https');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();

const hostname = 'api.lixu365.com';

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', router);
const privateKey = fs.readFileSync('./https/2_api.lixu365.com.key');
const cert = fs.readFileSync('./https/1_api.lixu365.com_bundle.crt');
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

httpsServer.listen(8082, hostname, function() {
  console.log('https已经启动在', 8082)
})

const server = app.listen(5000, function(){
  const { address, port } = server.address();
  console.log(`http已启动在${address}${port}`);
})