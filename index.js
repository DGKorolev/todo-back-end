const express = require('express')
const taskRouter = require('./routes/taskRouter')
const errorHandler = require('./middleware/errorHandler')
const fs = require("fs");


const app = express()

app.use(express.json())

app.use(taskRouter)

app.use(errorHandler)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server has been started...`)
})

