const User = require('../models/users');
const bcrypt = require('../helpers/bcrypt');
const { getToken } = require('../helpers/jwt')
module.exports = {
   create: function (req, res, next) {
      const {isSeller, username, password} = req.body
      console.log(isSeller, username, password)
      const model = new User({
         username,
         isSeller,
         password
      })
      model.save()
         .then(result => {
            const payload = {
               isSeller,
               username,
               _id: result._id
            }
            const token = getToken(payload)
            res.status(201).json({token})
         })

   },
   login: function (req, res, next) {
      const {password, username} = req.body
      console.log(password, username)
      User.findOne({ username })
         .then(result => {
            if(result) {
               if(bcrypt.comparePassword(password, result.password)) {
                  const payload = {
                     isSeller: result.isSeller,
                     username,
                     _id: result._id
                  }
                  const token = getToken(payload)
                  console.log(token)
                  res.status(200).json({token})
               } else {
                  next({
                     status: 404,
                     message: "Invalid Username / Password"
                  })
               }
            } else {
               next({status: 404, message: "Invalid Username / Password"})
            }
         })
         .catch(err => {
            next({status: 500, message: "Internal Server Error"})
         })
   },
}