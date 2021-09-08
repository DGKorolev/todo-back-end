const express = require('express')
const router = express()
const {body} = require('express-validator');
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
const {User} = require('../../models/index')
const bcrypt = require("bcrypt");
const JwtToken = require("../../services/jwtToken");
const ApiError = require("../../error/apiError");
const {hash} = require("bcrypt");


module.exports = router.post('/refresh-token',
    checkValidateErrorMiddleware,

    async (req, res, next) => {



    }
)