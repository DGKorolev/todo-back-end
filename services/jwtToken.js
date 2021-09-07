const jwt = require('jsonwebtoken')

class JwtToken{

    static create(data){
        return jwt.sign(data, process.env.SECRET_KEY, {expiresIn: '1d'})
    }

    static verify(token){
        return  jwt.verify(token, process.env.SECRET_KEY)
    }

}

module.exports = JwtToken