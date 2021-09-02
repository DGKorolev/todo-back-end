const express = require('express')
const router = express()
const {body} = require('express-validator');
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
// const {User} = require('../../models/index').sequelize.models
const {User} = require('../../models/index')


module.exports = router.post('/login',

)