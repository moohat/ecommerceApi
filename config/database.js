//Set up mongoose connection
const mongoose = require('mongoose');
// const mongoDB = 'mongodb://127.0.0.1/node_rest_api';
const mongoDB = 'mongodb://localhost/ecommerce';
mongoose.connect(mongoDB,{useNewUrlParser: true,  useUnifiedTopology: true });
mongoose.Promise = global.Promise;
module.exports = mongoose;