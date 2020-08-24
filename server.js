const express = require('express');
const logger = require('morgan');
const products = require('./routes/products');
const users = require('./routes/users');
const invoices = require('./routes/invoices');
const orders = require('./routes/orders');
const bodyParser = require('body-parser');
const mongoose = require('./config/database'); //database configuration
var jwt = require('jsonwebtoken');
const app = express();
app.set('secretKey', 'nodeRestApi'); // jwt secret token
// connection to mongodb
mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'));
app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', function (req, res) {
  res.json({ "tutorial": "Build REST API with node.js" });
});
// public route
app.use('/api/users', users);
// private route
// app.use('/api/products', validateUser, products);
app.use('/api/products', products);
app.use('/api/orders', orders);
app.use('/api/invoices', validateUser, invoices);
app.get('/favicon.ico', function (req, res) {
  res.sendStatus(204);
});
function validateUser(req, res, next) {
  jwt.verify(req.headers['token'], req.app.get('secretKey'), function (err, decoded) {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });

}
// express doesn't consider not found 404 as an error so we need to handle 404 explicitly
// handle 404 error
app.use(function (req, res, next) {
  let err = new Error('Not Found');
  err.status = 404;
  next(err);
});
// handle errors
app.use(function (err, req, res, next) {
  console.log(err);

  if (err.status === 404)
    res.status(404).json({ message: "Not found" });
  else
    res.status(500).json({ message: "Something looks wrong :( !!!" });
});



// App Server Connection
app.listen(process.env.PORT || 3000, () => {
  console.log(`aplikasi running pada port ${process.env.PORT || 3000}`)
})