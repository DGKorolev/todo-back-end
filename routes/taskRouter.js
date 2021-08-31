const Router = require('express')
const router = Router()
const taskGetAll = require("../controllers/task/tasks.get")
const taskCreate = require("../controllers/task/task.post")
const taskDelete = require("../controllers/task/task.delete")
const taskEdit = require("../controllers/task/task.patch")


router.get('/', taskGetAll)
router.post('/', taskCreate)
router.delete('/:id', taskDelete)
router.patch('/:id', taskEdit)

module.exports = router