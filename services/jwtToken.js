
const jwt = require('jsonwebtoken')

class JwtToken{

    static create(data){
        return jwt.sign(data, process.env.SECRET_KEY, {expiresIn: process.env.TOKEN_EXPIRES_IN})
    }

}

module.exports = JwtToken