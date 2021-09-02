const express = require('express')
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware')
const recursive = require('recursive-readdir-sync');

const app = express()

app.use(express.json())

recursive(`${__dirname}/routes`).forEach(file => app.use('/', require(file)));

app.use(errorHandlerMiddleware)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server has been started...`)
})