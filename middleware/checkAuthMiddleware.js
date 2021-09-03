const ApiError = require("../error/apiError");
const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {

    try {

        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.SECRET_KEY)

        req.user = decoded

    }catch (e){
        return next(ApiError.forbidden(e.message))
    }

    return next()
}