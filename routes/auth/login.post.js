const express = require('express')
const router = express()
const {body} = require('express-validator');
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
// const {User} = require('../../models/index').sequelize.models
const {User} = require('../../models/index')
const bcrypt = require("bcrypt");
const JwtToken = require("../../services/jwtToken");
const ApiError = require("../../error/apiError");


module.exports = router.post('/login',
    body('email').isEmail(),
    body('password'),
    checkValidateErrorMiddleware,

    async (req, res, next) => {

        const {email, password} = req.body

        try {

            const hashPassword = await bcrypt.hash(password, 5)

            const user = await User.findOne({
                where: {
                    email,
                    password: hashPassword
                }
            })

            if (!user) return next(ApiError.badRequest("User not founded"))

            const token = JwtToken.create({
                user: {id: user.id}
            })

            res.cookie('jwtToken', token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path: '/'
            })

            res.json({user, jwtToken: token})

        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }

    }
)