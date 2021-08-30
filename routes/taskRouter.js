const Router = require('express')
const router = Router()
const taskController = require("../controllers/taskController");

router.get('/', taskController.getAll)
router.post('/', taskController.create)
router.delete('/:id', taskController.delete)
router.patch('/:id', taskController.edit)

module.exports = router