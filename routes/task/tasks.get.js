const express = require('express')
const router = express()
const getTime = require("../../library/library");
const Task = require("../../model/Task")


module.exports = router.get('/tasks', getAll)

function getAll(req, res){

    const tasks = Task.getTasks()

    const {filterType = '', sortDirection = ''} = req.query

    const sortedAndFilteredTasks = sortAndFilterTasks(tasks, filterType, sortDirection)

    res.json(sortedAndFilteredTasks)

}

function sortAndFilterTasks(tasks, filterType, sortDirection){

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

    return  filterTasks.sort((a, b) => {
        const res = getTime(a.createdAt) - getTime(b.createdAt)
        return sortDirection.toUpperCase() === 'ASC' ? res : -res
    })

}


