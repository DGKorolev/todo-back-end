const express = require('express')
const router = express()
const {body} = require('express-validator');
const checkAuthMiddleware = require("../../middleware/checkAuthMiddleware");
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
const {Task} = require('../../models/index').sequelize.models


module.exports = router.post(
    '/task',
    checkAuthMiddleware,
    body('name').isString().bail().trim().notEmpty(),
    checkValidateErrorMiddleware,

    async (req, res, next) => {

        console.log(req)

        const {name} = req.body

        const newTask = await Task.create({
            name,
            user_id: res.locals.user.id
        })

        res.json(newTask)

    }
)