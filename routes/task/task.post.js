const express = require('express')
const router = express()
const ApiError = require("../../error/apiError");
const {v4} = require("uuid");
const Task = require("../../model/Task")

module.exports = router.post('/task', taskCreate)

async function taskCreate(req, res, next) {

    const {name} = req.body

    if (!name.trim()) return next(ApiError.unprocessableEntity('Task name not defined'))

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