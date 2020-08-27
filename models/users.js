const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser: true, useUnifiedTopology: true})

const bcrypt = require('../helpers/bcrypt');
//Define a schema
const User = new mongoose.Schema({
 username: {
  type: String,
  trim: true,  
  required: true,
 },
 isSeller: {
  type: Boolean,
  trim: true,
  required: true,
 },
 password: {
  type: String,
  trim: true,
  required: true
 }
});
// hash user password before saving into database
User.pre('save', function(next){
    this.password = bcrypt.hashPassword(this.password);
    next();
});
module.exports = mongoose.model('User', User);