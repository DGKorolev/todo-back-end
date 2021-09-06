const ApiError = require("../error/apiError");
const jwt = require("jsonwebtoken")
const {User} = require('../models/index')
const UserTransform = require('../transformObject/UserTransform')

module.exports = async (req, res, next) => {

    try {

        const token = req.headers.authorization.split(' ')[1]
        const data = jwt.verify(token, process.env.SECRET_KEY)

        let user = await User.findOne({
            where: {
                id: data.user.id
            }
        })

        if (!user) throw new Error('User not exist')

        user = new UserTransform(user)

        console.log(user)

        res.locals.user = user

    }catch (e){
        return next(ApiError.forbidden(e.message))
    }

    return next()
}