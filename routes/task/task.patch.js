const express = require('express')
const router = express()
const ApiError = require("../../error/apiError");
const {body, param} = require('express-validator');
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
const {Task} = require('../../models/index').sequelize.models


module.exports = router.patch(
    '/task/:id',
    body('name').optional().isString().trim().notEmpty(),
    body('done').optional().toBoolean(),
    param('id').isInt(),
    checkValidateErrorMiddleware,

    async (req, res, next) => {

        const {id} = req.params

        try {

            const updatedTask = await Task.update(req.body, {
                where: {id},
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

