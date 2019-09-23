const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const cors = require('cors')
const aesjs = require('aes-js')
const bus = require('./routers/Bus')
const backupDatabase = require('./routers/BackupDatabase')
port = process.env.PORT || 8000
app.use(cors());

app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));
app.use(bus)
app.use(backupDatabase)

app.listen(port, () => {
  console.log('Bạn đang chạy trên port: ' + port)
})
