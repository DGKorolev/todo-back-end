const express = require('express')
const router = express()
const ApiError = require("../../error/apiError");
const {v4} = require("uuid");
const Task = require("../../model/Task")
const { body, validationResult } = require('express-validator');

module.exports = router.post(
    '/task',
    body('name').isString().bail().trim().notEmpty(),
    taskCreate
)

async function taskCreate(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        next(ApiError.validationError())
    }

    const {name} = req.body

    const newTask = {
        uuid: v4(),
        name,
        done: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    const tasks = await Task.getTasks()
    tasks.push(newTask)
    Task.saveTasks(tasks)

    res.json(newTask)

}