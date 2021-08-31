const express = require('express')
const taskRouter = require('./routes/taskRouter')
const errorHandler = require('./middleware/errorHandler')
const fs = require("fs");
require('dotenv').config()

const PORT = process.env.PORT || process.env.LOCAL_PORT

const app = express()

app.use(express.json())


app.use('/task', taskRouter)

app.use(errorHandler)

app.listen(PORT, () => {
    console.log(`Server has been started on port: ${PORT}`)
})

