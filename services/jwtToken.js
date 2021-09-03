

const jwt = require('jsonwebtoken')

class JwtToken{

    static create(data){
        console.log(process.env.SECRET_KEY)
        return jwt.sign(data, process.env.SECRET_KEY, {expiresIn: '1d'})
    }

}

module.exports = JwtToken