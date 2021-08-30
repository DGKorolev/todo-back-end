const express = require('express')
const taskRouter = require('./routes/taskRouter')
const errorHandler = require('./middleware/errorHandler')
const fs = require("fs");
require('dotenv').config()

const app = express()

app.use(express.json())


app.use('/task', taskRouter)

app.use(errorHandler)

app.listen(process.env.PORT, process.env.HOST, () => {
    console.log(`Server has been started at ${process.env.HOST}:${process.env.PORT}`)
})