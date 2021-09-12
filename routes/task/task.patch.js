const express = require('express')
const router = express()
const ApiError = require("../../error/apiError");
const {body, param} = require('express-validator');
const checkAuthMiddleware = require("../../middleware/checkAuthMiddleware");
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
const {Task} = require('../../models/index').sequelize.models
const {sequelize} = require('../../models/index')

const POSITION_INTERVAL = 100

module.exports = router.patch(
    '/task/:task_id',
    checkAuthMiddleware,
    body('name').optional().isString().trim().notEmpty(),
    body('done').optional().toBoolean(),
    body('change_position').optional().isObject(),
    body('change_position.*.selectedTaskId').optional().isInt(),
    body('change_position.*.targetTaskId').optional().isInt(),
    param('task_id').isInt(),
    checkValidateErrorMiddleware,

    async (req, res, next) => {

        const {task_id} = req.params
        const user_id = res.locals.user.id

        try {

            if (req.body.change_position) {
                await replaceTasks(req.body.change_position, user_id)
                return  res.json()
            }


            const updatedTask = await Task.update(req.body, {
                where: {
                    id: task_id,
                    user_id
                },
                returning: true,
                plain: true,
                raw: true
            })

            return res.json(updatedTask[1])


        } catch (e) {

            return next(ApiError.unprocessableEntity(e.message))

        }

    }
)



async function replaceTasks(options, user_id) {

    if (!options) return

    const {selectedTaskId, targetTaskId} = options

    const tasks = await Task.findAll({
        where: {
            user_id
        },
        order: [
            ['menu_position', 'ASC']
        ]
    })

    const selectedTask = tasks.find(task => task.id === selectedTaskId)
    const targetTask = tasks.find(task => task.id === targetTaskId)

    const previousTask = tasks[tasks.indexOf(targetTask) - 1]

    const previousMenuPosition = previousTask ? previousTask.menu_position : 0

    const offset = (targetTask.menu_position - previousMenuPosition) / 2

    if (offset < 1) {

        const reindexTargetTaskMenuPosition = await reindexTasks(tasks, targetTask.id)
        selectedTask.menu_position = reindexTargetTaskMenuPosition - POSITION_INTERVAL / 2

    } else {
        selectedTask.menu_position = Math.abs(targetTask.menu_position - Math.ceil(offset))
    }

    await selectedTask.save()
}



async function reindexTasks(tasks, targetTaskId = 0) {

    let targetTaskMenuPosition
    await sequelize.transaction(async t => {

        for (const task of tasks) {

            task.menu_position = (tasks.indexOf(task) + 1) * POSITION_INTERVAL
            await task.save({transaction: t})

            if (task.id === targetTaskId) targetTaskMenuPosition = task.menu_position
        }
    })

    return targetTaskMenuPosition

}

