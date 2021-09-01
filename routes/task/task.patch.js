const express = require('express')
const router = express()
const Task = require("../../model/Task")
const ApiError = require("../../error/apiError");


module.exports = router.patch('/task/:id', taskEdit)

async function taskEdit(req, res, next) {

    let tasks = await Task.getTasks()

    const {id} = req.params
    if (!tasks.some(task => task.uuid === id)) return next(ApiError.unprocessableEntity('Task with this id does not exist'))


    const editData = {}

    if (req.body.hasOwnProperty('name')) {

        const name = req.body.name.trim()

        if (!name) return next(ApiError.unprocessableEntity('Task name not defined'))

        editData.name = name

    }

    if (req.body.hasOwnProperty('done')) {

        const done = req.body.done

        editData.done = Boolean(done)

    }


    tasks = tasks.map(task => {
            if (task.uuid !== id) return task
            return {...task, ...editData}
        }
    )


    Task.saveTasks(tasks)

    res.json(tasks.find(task => task.uuid === id))

}