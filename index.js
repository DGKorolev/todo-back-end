const express = require('express')
const recursive = require('recursive-readdir-sync');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware')
const cors = require('cors')
const coolieParser = require('cookie-parser')
require('dotenv').config()

const app = express()

app.use(cors({
    credential: true,
    // origin: 'localhost:3000'
}))
app.use(express.json())
app.use(coolieParser())

recursive(`${__dirname}/routes`).forEach(file => app.use('/', require(file)));

app.use(errorHandlerMiddleware)

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server has been started...`)
})