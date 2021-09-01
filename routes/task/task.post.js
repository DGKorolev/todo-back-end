const express = require('express')
const router = express()
const {v4} = require("uuid");
const Task = require("../../model/Task")
const {body} = require('express-validator');
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')

module.exports = router.post(
    '/task',
    body('name').isString().bail().trim().notEmpty(),
    checkValidateErrorMiddleware,
    taskCreate
)

async function taskCreate(req, res, next) {

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