const jwt = require('jsonwebtoken')

function getToken(payload) {
    return jwt.sign(payload, process.env.SECRET)
}

function verify(token) {
    return jwt.verify(token, process.env.SECRET)
}

module.exports = {
    getToken,
    verify
}