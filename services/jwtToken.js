const jwt = require('jsonwebtoken')

class JwtToken{

    static create(data){
        return jwt.sign(data, process.env.SECRET_KEY, {expiresIn: '1d'})
    }

}

module.exports = JwtToken