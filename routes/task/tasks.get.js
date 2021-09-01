const express = require('express')
const router = express()
const getTime = require("../../library/library");
const Task = require("../../model/Task")


module.exports = router.get('/tasks', getAll)

async function getAll(req, res){

    const tasks = await Task.getTasks()

    console.log(tasks)

    res.json(tasks)

    // const {filterType = '', sortDirection = ''} = req.query
    //
    // const sortedAndFilteredTasks = sortAndFilterTasks(tasks, filterType, sortDirection)
    //
    // res.json(sortedAndFilteredTasks)

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


