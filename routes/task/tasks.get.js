const express = require('express')
const router = express()
const {Task} = require('../../models/index').sequelize.models
const { query } = require('express-validator');

const checkValidateErrorMiddleware = require('../../middleware/checkValidateErrorMiddleware')
const checkAuthMiddleware = require("../../middleware/checkAuthMiddleware");


module.exports = router.get(
    '/tasks',
    checkAuthMiddleware,
    query('filterBy').optional().toUpperCase(),
    query('order').optional().toUpperCase(),
    checkValidateErrorMiddleware,

    async (req, res) => {

        const {filterBy = '', order = ''} = req.query

        const options = createOptions(res.locals.user.id, filterBy, order)

        const tasks = await Task.findAll(options)

        res.json(tasks)
    }
)


function createOptions(id, filterBy, order) {

    const options = {raw: true}

    options.where = {user_id: id}

    if (filterBy === 'DONE') options.where = {...options.where, done: true}
    if (filterBy === 'UNDONE') options.where = {...options.where, done: false}

    options.order = order.toUpperCase() === 'DESC' ? [['createdAt', 'DESC']] : [['createdAt', 'ASC']]

    return options
}


