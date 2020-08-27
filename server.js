require('dotenv').config()

const express = require('express');
const logger = require('morgan');
const app = express();
const errorHandler = require('./middlewares/errorHandler')

const router = require('./routes')
// connection to mongodb
app.use(logger('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.use('/api', router)
app.use(errorHandler)
// App Server Connection
app.listen(process.env.PORT, () => {
  console.log(`aplikasi running pada port ${process.env.PORT}`)
})