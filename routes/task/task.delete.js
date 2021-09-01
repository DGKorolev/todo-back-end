const express = require('express')
const router = express()
const Task = require("../../model/Task")
const ApiError = require("../../error/apiError");


module.exports = router.delete('/task/:id', taskDelete)

async function taskDelete(req, res, next) {

    let tasks = await Task.getTasks()

    const {id} = req.params

    if (!tasks.some(task => task.uuid === id)) return next(ApiError.unprocessableEntity('Task with this id does not exist'))

    tasks = tasks.filter(task => task.uuid !== id)

    Task.saveTasks(tasks)

    res.status(204).json()

}