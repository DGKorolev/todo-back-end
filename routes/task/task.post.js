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

        const {name} = req.body

        let menu_position = await Task.max('menu_position', {
            where:{
                user_id: res.locals.user.id
            }
        })

        menu_position = menu_position ?  menu_position + 1000000 : 1000000

        const newTask = await Task.create({
            name,
            menu_position,
            user_id: res.locals.user.id
        })

        res.json(newTask)

    }
)