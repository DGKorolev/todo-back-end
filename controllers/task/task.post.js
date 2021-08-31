const ApiError = require("../../error/apiError");
const {v4} = require("uuid");
const Task = require("../../model/Task")

module.exports = (req, res, next) => {

    const {name} = req.body

    if (!name.trim()) return next(ApiError.unprocessableEntity('Task name not defined'))

    const newTask = {
        uuid: v4(),
        name,
        done: false,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }

    const tasks = Task.getTasks()
    tasks.push(newTask)
    Task.saveTasks(tasks)

    res.json(newTask)

}