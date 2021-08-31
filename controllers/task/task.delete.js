const Task = require("../../model/Task")
const ApiError = require("../../error/apiError");


module.exports = (req, res, next) => {

    let tasks = Task.getTasks()

    const {id} = req.params

    if (!tasks.some(task => task.uuid === id)) return next(ApiError.unprocessableEntity('Task with this id does not exist'))

    tasks = tasks.filter(task => task.uuid !== id)

    Task.saveTasks(tasks)

    res.status(204).json()

}