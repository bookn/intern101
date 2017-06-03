const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const crawling = require('./crawling')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/books', router)
app.use('/crawling', crawling)
app.listen(3000)

module.exports = app;

