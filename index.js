const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const config = require('./config').mongo

// route
const books = require('./route/books')
const tracking = require('./route/tracking')
const demo = require('./route/demo')

const app = express()
const PORT = 3000

mongoose.connect(`mongodb://${config.host}:${config.port}/${config.database}`)


app.disable('etag');
app.use(express.static(path.join(__dirname, '/public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/books', books)
app.use('/tracking', tracking)
app.use('/demo', demo)

app.listen(PORT, () => {
  console.log(`Server run at port ${PORT}`)
})

module.exports = app
