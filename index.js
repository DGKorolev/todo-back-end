const express = require('express')
const errorHandler = require('./middleware/errorHandler')
const recursive = require('recursive-readdir-sync');


const app = express()

app.use(express.json())

recursive(`${__dirname}/routes`).forEach(file => app.use('/', require(file)));

app.use(errorHandler)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server has been started...`)
})