const express = require('express')
const router = express()
const ApiError = require("../../error/apiError");
const {body, param} = require('express-validator');
const checkAuthMiddleware = require("../../middleware/checkAuthMiddleware");
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
const {Task} = require('../../models/index').sequelize.models


module.exports = router.patch(
    '/task/:task_id',
    checkAuthMiddleware,
    body('name').optional().isString().trim().notEmpty(),
    body('done').optional().toBoolean(),
    param('task_id').isInt(),
    checkValidateErrorMiddleware,

    async (req, res, next) => {

        const {task_id} = req.params

        try {

            const updatedTask = await Task.update(req.body, {
                where: {
                    id: task_id,
                    user_id: res.locals.user.id
                },
                returning: true,
                plain: true,
                raw: true
            })

            res.json(updatedTask[1])

        }catch (e){

            return next(ApiError.unprocessableEntity(e.message))

        }

    }
)

