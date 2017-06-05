const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const crawling = require('./crawling')

const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/books', router)
app.use('/crawling', crawling)
app.listen(PORT, () => {
  console.log(`Server run at port ${PORT}`)
})

module.exports = app;

