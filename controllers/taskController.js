const {v4} = require('uuid')
const ApiError = require('../error/apiError')
const getTime = require("../library/library");
const fs = require("fs");


class TaskController {

    getAll(req, res) {


        const tasks = JSON.parse(fs.readFileSync("./data.txt", 'utf8'))

        const {filterType = '', sortDirection = ''} = req.query

        let filterTasks

        switch (filterType.toUpperCase()) {
            case "DONE":
                filterTasks = tasks.filter(task => task.done)
                break

            case "UNDONE":
                filterTasks = tasks.filter(task => !task.done)
                break

            default:
                filterTasks = tasks
                break
        }


        const filterAndSortTasks = filterTasks.sort((a, b) => {
            const res = getTime(a.createdAt) - getTime(b.createdAt)
            return sortDirection.toUpperCase() === 'ASC' ? res : -res
        })

        res.json(filterAndSortTasks)

    }

    create(req, res, next) {

        const {name} = req.body

        if (!name.trim()) return next(ApiError.unprocessableEntity('Task name not defined'))

        const newTask = {
            uuid: v4(),
            name,
            done: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        }

        const tasks = JSON.parse(fs.readFileSync("./data.txt", 'utf8'))
        tasks.push(newTask)
        fs.writeFileSync('./data.txt', JSON.stringify(tasks), 'utf8')

        res.json(newTask)
    }

    delete(req, res, next) {

        let tasks = JSON.parse(fs.readFileSync("./data.txt", 'utf8'))

        const {id} = req.params

        if (!tasks.some(task => task.uuid === id)) return next(ApiError.unprocessableEntity('Task with this id does not exist'))

        tasks = tasks.filter(task => task.uuid !== id)

        fs.writeFileSync('./data.txt', JSON.stringify(tasks), 'utf8')

        res.status(204).json()
    }

    edit(req, res, next) {

        let tasks = JSON.parse(fs.readFileSync("./data.txt", 'utf8'))

        console.log(tasks)

        const {id} = req.params
        if (!tasks.some(task => task.uuid === id)) return next(ApiError.unprocessableEntity('Task with this id does not exist'))

        const editData = {}
        if (req.body.hasOwnProperty('name')) {
            const name = req.body.name.trim()
            if (name) editData.name = name
            else return next(ApiError.unprocessableEntity('Task name not defined'))
        }

        if (req.body.hasOwnProperty('done')) {
            const done = req.body.done
            editData.done = Boolean(done)

        }

        tasks = tasks.map(task => {
                console.log(task.uuid !== id)
                if (task.uuid !== id) return task
                return {...task, ...editData}
            }
        )

        fs.writeFileSync('./data.txt', JSON.stringify(tasks), 'utf8')

        res.json(tasksArr.find(task => task.uuid === id))
    }


}

module.exports = new TaskController()
