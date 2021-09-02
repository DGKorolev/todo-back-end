const express = require('express')
const router = express()
const ApiError = require("../../error/apiError");
const {param} = require("express-validator");
const checkValidateErrorMiddleware = require("../../middleware/checkValidateErrorMiddleware");
const {Task} = require('../../models/index').sequelize.models

module.exports = router.delete(
    '/task/:id',
    param('id').isInt(),
    checkValidateErrorMiddleware,

    async (req, res, next) => {

        const {id} = req.params;

        try {

            await Task.destroy({
                where: {id}
            })

        }catch (e){
            return next(ApiError.unprocessableEntity(e.message))
        }

        res.status(204).json()

    }
)
