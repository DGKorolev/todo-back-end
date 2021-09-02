const express = require('express')
const router = express()
const {body} = require('express-validator');
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
const {Task} = require('../../models/index').sequelize.models

module.exports = router.post(
    '/task',
    body('name').isString().bail().trim().notEmpty(),
    checkValidateErrorMiddleware,

    async (req, res, next) => {

        const {name} = req.body

        const newTask = await Task.create({
            name
        })

        res.json(newTask)

    }
)