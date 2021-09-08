const express = require('express')
const router = express()
const {User, Token} = require('../../models/index')
const bcrypt = require("bcrypt");
const JwtToken = require("../../services/jwtToken");
const ApiError = require("../../error/apiError");


module.exports = router.post('/login',

    async (req, res) => {
        res.clearCookie('jwtToken')
        res.end()
    }
)