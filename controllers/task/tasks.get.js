const getTime = require("../../library/library");
const Task = require("../../model/Task")

module.exports = (req, res) => {

    const tasks = Task.getTasks()

    tasks.sort((a, b) => getTime(a.date) - getTime(a.date))

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