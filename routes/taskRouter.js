const Router = require('express')
const router = Router()
const taskGetAll = require("../controllers/task/tasks.get")
const taskCreate = require("../controllers/task/task.post")
const taskDelete = require("../controllers/task/task.delete")
const taskEdit = require("../controllers/task/task.patch")


router.get('/tasks', taskGetAll)
router.post('/task', taskCreate)
router.delete('/task/:id', taskDelete)
router.patch('/task/:id', taskEdit)

module.exports = router