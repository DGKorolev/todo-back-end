const express = require('express');
const recursive = require('recursive-readdir-sync');
const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');
const cors = require('cors')
const cookieParser = require('cookie-parser');
require('dotenv').config();

console.log(process.env.API_URL)

const app = express();

app.use(cors({
    origin: process.env.API_URL,
    credentials: true,
    exposedHeaders: ["set-cookie"],
}));

app.use(express.json());
app.use(cookieParser());

recursive(`${__dirname}/routes`).forEach(file => app.use('/', require(file)));

app.use(errorHandlerMiddleware);

app.listen(process.env.PORT || 3000, () => {
    console.log(`Server has been started..`)
});