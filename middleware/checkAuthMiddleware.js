const ApiError = require("../error/apiError");
const jwt = require("jsonwebtoken")
const {User} = require('../models/index')
const UserTransform = require('../transformObject/UserTransform')
const JwtToken = require('../services/jwtToken')

module.exports = async (req, res, next) => {

    try {

        const data = JwtToken.verify(req.cookies.jwtToken)

        let user = await User.findOne({
            where: {
                id: data.user.id
            }
        })

        if (!user) throw new Error('User not exist')

        res.locals.user = new UserTransform(user)

    }catch (e){
        return next(ApiError.forbidden(e.message))
    }

    return next()
}