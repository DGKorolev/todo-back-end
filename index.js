const express = require('express')


const app = express()

app.use(express.json())


app.get('/', (req, res) => {
    res.send('Hello World')
})

app.listen(3000, () => {
    console.log(`Server has been started at http://localhost:3000`)
})