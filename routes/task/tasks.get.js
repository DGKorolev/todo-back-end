const express = require('express')
const router = express()
const {Task} = require('../../models/index').sequelize.models
const {query} = require('express-validator');
const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
const checkAuthMiddleware = require("../../middleware/checkAuthMiddleware");


module.exports = router.get(
    '/tasks',
    checkAuthMiddleware,
    query('filterType').toUpperCase(),
    query('sortDirection').toUpperCase(),
    checkValidateErrorMiddleware,

    async (req, res) => {

        const {filterType = '', sortDirection = ''} = req.query

        const options = createOptions(res.locals.user.id, filterType, sortDirection)

        const tasks = await Task.findAll(options)

        res.json(tasks)
    }
)


function createOptions(id, filterType, sortDirection) {

    const options = {raw: true}

    options.where = {id}

    if (filterType === 'DONE') options.where = {...options.where, done: true}
    if (filterType === 'UNDONE') options.where = {...options.where, done: false}

    options.order = sortDirection.toUpperCase() === 'DESC' ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']]

    return options
}


