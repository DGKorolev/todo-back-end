const {validationResult} = require("express-validator");
const ApiError = require("../error/apiError");

module.exports = (req, res, next) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return next(ApiError.unprocessableEntity('Validation error'))
    }

    next()

}