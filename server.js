const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const crawling = require('./crawling')

const app = express()
const PORT = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/books', router)
crawling.jobStart()

app.listen(PORT, () => {
  console.log(`Server run at port ${PORT}`)
})

console.log(process.env.URL)
module.exports = app;
