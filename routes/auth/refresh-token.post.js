const express = require('express')
const router = express()
const {body} = require('express-validator');
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
const {User, Token} = require('../../models/index')
const bcrypt = require("bcrypt");
const JwtToken = require("../../services/jwtToken");
const ApiError = require("../../error/apiError");
const {hash} = require("bcrypt");


module.exports = router.post('/refresh-token',

    async (req, res, next) => {

    try{

        const refreshToken =  req.cookies.jwtToken

        JwtToken.verify(refreshToken)

        const fundedToken = await Token.findOne({
            where: {
                token: refreshToken
            },
            raw: true
        })

        if (!fundedToken) return next(ApiError.forbidden('Token is not valid'))

        const accessToken = JwtToken.create({id: fundedToken.user_id})

        res.json({jwtToken: accessToken})

    }catch (e){
        return next(ApiError.forbidden('Token is not valid'))
    }


    }
)