const express = require('express')
const router = express()
const {body} = require('express-validator');
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
const ApiError = require("../../error/apiError");
const {User} = require('../../models/index')
const bcrypt = require('bcrypt')
const JwtToken = require('../../services/jwtToken')



module.exports = router.post('/registration',
    body('email').isEmail(),
    body('password'),
    checkValidateErrorMiddleware,

    async (req, res, next) => {

        const {email, password} = req.body

        try{

            const count = await User.count({
                where: {email}
            })

            // if (count) return next(ApiError.badRequest("User with this email already exists!"))

            const hashPassword = await bcrypt.hash(password, 5)

            const user = (await User.create({
                email,
                password: hashPassword
            })).dataValues

            const token = JwtToken.create({
                user: {
                    id: user.id,
                    email: user.email
                }
            })

            res.cookie('jwtToken', token, {
                maxAge: 30 * 24 * 60 * 60 * 1000,
                path: '/'
            })

            res.json({user, jwtToken: token})

        }catch (e){
            return next(ApiError.badRequest(e.message))

        }

    }
)