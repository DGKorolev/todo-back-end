const jwt = require('jsonwebtoken')

class JwtToken{

    static create(data){
        return jwt.sign(data, process.env.SECRET_KEY, {expiresIn: '10s'})
    }


    static creatRefreshToken(data){
        return jwt.sign(data, process.env.SECRET_KEY, {expiresIn: '60d'})
    }

    static verify(token){
        return  jwt.verify(token, process.env.SECRET_KEY)
    }

}

module.exports = JwtToken