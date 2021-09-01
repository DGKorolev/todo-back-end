const express = require('express')
const router = express()
const Task = require("../../model/Task")
const ApiError = require("../../error/apiError");
const {body, validationResult} = require('express-validator');


module.exports = router.patch(
    '/task/:id',
    body("name").optional().isString().trim().notEmpty(),
    body('done').optional().toBoolean(),
    taskEdit)

async function taskEdit(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(ApiError.unprocessableEntity('dfsfsd'))
    }

    let tasks = await Task.getTasks()

    const {id} = req.params
    if (!tasks.some(task => task.uuid === id)) return next(ApiError.unprocessableEntity('Task with this id does not exist'))

    const editData = {};

    ['name', 'done']
        .forEach(propertyName => {
            if (req.body.hasOwnProperty(propertyName)) editData[propertyName] = req.body[propertyName]
        })

    tasks = tasks.map(task => {
            if (task.uuid !== id) return task
            return {...task, ...editData}
        }
    )

    Task.saveTasks(tasks)

    res.json(tasks.find(task => task.uuid === id))

}