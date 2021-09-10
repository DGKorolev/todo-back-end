const express = require('express')
const router = express()
const {User, Token} = require('../../models/index')
const bcrypt = require("bcrypt");
const JwtToken = require("../../services/jwtToken");
const ApiError = require("../../error/apiError");


module.exports = router.post('/logout',

    async (req, res) => {

        const refreshToken = req.cookies.jwtToken

        await Token.destroy({
            where: {
                token: refreshToken
            },
            raw: true
        })

        res.clearCookie('jwtToken')
        res.end()
    }
)