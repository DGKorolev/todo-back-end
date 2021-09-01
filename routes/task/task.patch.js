const express = require('express')
const router = express()
const Task = require("../../model/Task")
const ApiError = require("../../error/apiError");
const {body} = require('express-validator');
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')

module.exports = router.patch(
    '/task/:id',
    body("name").optional().isString().trim().notEmpty(),
    body('done').optional().toBoolean(),
    checkValidateErrorMiddleware,

    async (req, res, next) => {

        let tasks = await Task.getTasks()

        const {id} = req.params
        if (!tasks.some(task => task.uuid === id)) return next(ApiError.unprocessableEntity('Task with this id does not exist'))

        const editData = {};

        ['name', 'done']
            .forEach(propertyName => {
                if (req.body.hasOwnProperty(propertyName)) editData[propertyName] = req.body[propertyName]
            });

        const editTaskIndex = tasks.findIndex(task => task.uuid === id)
        tasks[editTaskIndex] = {...tasks[editTaskIndex], ...editData}
        await Task.saveTasks(tasks)

        res.json(tasks[editTaskIndex])
    }
)

