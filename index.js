const express = require('express')
const taskController = require('./controllers/taskController')


const app = express()

app.use(express.json())


app.get('/', taskController.getAll)
app.post('/', taskController.create)


app.listen(3000, () => {
    console.log(`Server has been started at http://localhost:3000`)
})