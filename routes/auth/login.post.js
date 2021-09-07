const express = require('express')
const router = express()
const {body} = require('express-validator');
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
const {User} = require('../../models/index')
const bcrypt = require("bcrypt");
const JwtToken = require("../../services/jwtToken");
const ApiError = require("../../error/apiError");
const {hash} = require("bcrypt");


module.exports = router.post('/login',
    body('email').isEmail(),
    body('password'),
    checkValidateErrorMiddleware,

    async (req, res, next) => {

        const {email, password} = req.body

        try {

            const user = await User.findOne({
                where: {
                    email
                }
            })

            const isValid = await bcrypt.compare('123',await bcrypt.hash('123', 5));

            if (!isValid) return next(ApiError.badRequest("User not founded"))

            const token = JwtToken.create({
                user: {id: user.id}
            })

            res.cookie('jwtToken', token, {
                maxAge: 24 * 60 * 60 * 1000,
                path: '/',
                httpOnly: true
            })

            res.json({user, jwtToken: token})

        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }

    }
)