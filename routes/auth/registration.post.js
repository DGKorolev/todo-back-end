const express = require('express')
const router = express()
const {body} = require('express-validator');
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
const ApiError = require("../../error/apiError");
const {User} = require('../../models/index')
const bcrypt = require('bcrypt')
const JwtToken = require('../../services/jwtToken')
require('dotenv').config()


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

            const newUser = (await User.create({
                email,
                password: hashPassword
            })).dataValues

            const token = JwtToken.create({
                id: newUser.id,
                email: newUser.email
            })

            res.set('Authorization', `Bearer ${token}`).end()

        }catch (e){
            return next(ApiError.badRequest(e.message))
        }

    }
)