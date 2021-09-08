const ApiError = require("../error/apiError");
const jwt = require("jsonwebtoken")
const {User} = require('../models/index')
const UserTransform = require('../transformObject/UserTransform')
const JwtToken = require('../services/jwtToken')

module.exports = async (req, res, next) => {

    try {

        const token = req.headers.authorization.split(' ')[1]
        const data = JwtToken.verify(token)



        let user = await User.findOne({
            where: {
                id: data.id
            },
            raw: true
        })

        if (!user) throw new Error('User not exist')

        res.locals.user = new UserTransform(user)

    }catch (e){
        return next(ApiError.forbidden(e.message))
    }

    return next()
}