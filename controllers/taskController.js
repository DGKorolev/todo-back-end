const {v4} = require('uuid')
const ApiError = require('../error/apiError')

let tasksArr = [
    {
        "uuid": "53a0796b-1217-4381-b35b-5538ed73bfff",
        "name": "create new browser",
        "done": true,
        "createdAt": "2021-08-27T14:24:26.543Z",
        "updatedAt": "2021-08-27T14:24:29.986Z"
    },
    {
        "uuid": "d69fe39c-e998-4c7c-8f17-9221c9782177",
        "name": "fewfwefwefwe",
        "done": true,
        "createdAt": "2021-08-27T14:25:18.404Z",
        "updatedAt": "2021-08-27T14:33:57.159Z"
    },
    {
        "uuid": "0d470935-b764-4d1f-963b-e867f513f851",
        "name": "fwefwef",
        "done": false,
        "createdAt": "2021-08-27T14:33:59.094Z",
        "updatedAt": "2021-08-27T14:33:59.094Z"
    },
    {
        "uuid": "02915849-4ae8-4d07-951b-5e1581886215",
        "name": "fewfwefwefewfewfwef",
        "done": false,
        "createdAt": "2021-08-27T14:43:34.017Z",
        "updatedAt": "2021-08-27T14:46:32.722Z"
    },
    {
        "uuid": "1b6cacca-a48f-479e-a8b5-541eee464e66",
        "name": "htrhrthrt",
        "done": false,
        "createdAt": "2021-08-30T08:14:13.139Z",
        "updatedAt": "2021-08-30T08:14:13.139Z"
    },
    {
        "uuid": "3ef9f3e5-cd1e-4595-9317-cbd3405a5355",
        "name": "rthrthrt",
        "done": false,
        "createdAt": "2021-08-30T08:14:17.113Z",
        "updatedAt": "2021-08-30T08:14:17.113Z"
    },
    {
        "uuid": "c707fca4-f5c1-4502-b710-c470cba1177a",
        "name": "hrthrthrt",
        "done": false,
        "createdAt": "2021-08-30T08:14:22.605Z",
        "updatedAt": "2021-08-30T08:14:22.605Z"
    },
    {
        "uuid": "7814b5e8-b481-446e-8c47-aad4a84302f9",
        "name": "rthrthrthrthrfwefwefwe",
        "done": true,
        "createdAt": "2021-08-30T08:14:15.189Z",
        "updatedAt": "2021-08-30T08:15:10.639Z"
    },
    {
        "uuid": "2ba86f3c-0aab-443f-a21b-2e608c7f890b",
        "name": "fwefwe",
        "done": true,
        "createdAt": "2021-08-30T08:13:55.613Z",
        "updatedAt": "2021-08-30T08:15:07.258Z"
    }
]

class TaskController {

    getAll(req, res) {

        res.json(tasksArr)

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

        tasksArr.push(newTask)

        res.json(newTask)
    }

    delete(req, res, next) {
        const {id} = req.params

        if (!tasksArr.some(task => task.uuid === id)) return next(ApiError.unprocessableEntity('Task with this id does not exist'))

        tasksArr = tasksArr.filter(task => task.uuid !== id)

        res.status(204).json()
    }

    edit(req, res, next) {

        const {id} = req.params
        if (!tasksArr.some(task => task.uuid === id)) return next(ApiError.unprocessableEntity('Task with this id does not exist'))

        const editData = {}
        if (req.body.hasOwnProperty('name')){
            const name = req.body.name.trim()
            if (name) editData.name = name
            else return next(ApiError.unprocessableEntity('Task name not defined'))
        }

        if (req.body.hasOwnProperty('done')){
            const done = req.body.done
            editData.done = Boolean(done)

        }

        tasksArr = tasksArr.map(task => {
                if (task.uuid !== id) return task
                return {...task, ...editData}
            }
        )

        res.json(tasksArr.find(task => task.uuid === id))
    }


}

module.exports = new TaskController()
