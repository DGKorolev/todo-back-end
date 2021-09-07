const express = require('express')
const router = express()
// const {Task} = require('../../models/index').sequelize.models
const { query } = require('express-validator');
const {sequelize} = require('../../models/index')

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

        const tasks = await sequelize.query(
            `SELECT * FROM "Tasks" ${crateWhere(res.locals.user.id, filterBy)} ${createOrder(order)}`,
            {
                type: sequelize.QueryTypes.SELECT,
                raw: true
            }
        );

        res.json(tasks)
    }
)


function createOrder(order){
    return 'ORDER BY "createdAt" ' + (order === 'ASC' ? 'ASC' : 'DESC')
}

function crateWhere(user_id, filterBy){

    const conditions = []

    if (user_id) conditions.push(`"user_id" = ${user_id}`)

    if (filterBy){

        switch (filterBy){
            case 'DONE':
                conditions.push('"done" = true')
                break
            case 'UNDONE':
                conditions.push('"done" = false')
                break
        }
    }

    let where = ''
    if (conditions.length)  where = 'WHERE ' + conditions.join(' AND ')

    return where

}


