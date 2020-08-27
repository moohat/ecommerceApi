const bcrypt = require('bcryptjs')

function hashPassword(password) {
    const salt = bcrypt.genSaltSync(5)
    return bcrypt.hashSync(password, salt)
}

function comparePassword(password, dbPass) {
    return bcrypt.compareSync(password, dbPass)
}

module.exports = {
    hashPassword,
    comparePassword
}