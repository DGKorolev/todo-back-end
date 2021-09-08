const express = require('express')
const router = express()
const {body} = require('express-validator');
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
const {User, Token} = require('../../models/index')
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

            const refreshToken = JwtToken.creatRefreshToken({id: user.id})

            await Token.create({
                token: refreshToken,
                user_id: user.id
            })

            res.cookie('jwtToken', refreshToken , {
                maxAge: 60 * 24 * 60 * 60 * 1000,
                path: '/',
                httpOnly: true
            })

            const accessToken = JwtToken.create({
                id: user.id
            })

            res.json({jwtToken: accessToken})

        } catch (e) {
            return next(ApiError.badRequest(e.message))
        }

    }
)