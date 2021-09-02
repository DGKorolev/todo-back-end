const express = require('express')
const router = express()
const {body} = require('express-validator');
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
const ApiError = require("../../error/apiError");
const {User} = require('../../models/index')
const bcrypt = require('bcrypt')
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

            if (count) return next(ApiError.badRequest("User with this email already exists!"))

            const hashPassword = bcrypt.hash(password, process.env.SALT_ROUNDS)


        }catch (e){
            return next(ApiError.badRequest(e.message))
        }





        res.json(resss)


    }
)