const express = require('express')
const checkAuthMiddleware = require("../../middleware/checkAuthMiddleware");
const router = express()
const {Task} = require('../../models/index').sequelize.models


module.exports = router.get(
    '/tasks',
    checkAuthMiddleware,

    async (req, res) => {

        console.log(req.user)

        const {filterType = '', sortDirection = ''} = req.query

        const tasks = await Task.findAll(createOptions(filterType, sortDirection))

        res.json(tasks)
    }

)



function createOptions(filterType, sortDirection) {

    const options = {raw: true}

    switch (filterType.toUpperCase()) {
        case "DONE":
            options.where = {done: true}
            break

        case "UNDONE":
            options.where = {done: false}
            break
    }

    options.order = sortDirection.toUpperCase() === 'DESC' ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']]

    return options

}


