const express = require('express')
const bodyParser = require('body-parser')
const router = require('./router')
const Crawling = require('./crawling')

const app = express()
const crawling = new Crawling(process.env.URL, process.env.DESTINATION_URL)
const PORT = 3000

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/books', router)

crawling.jobStart()

app.listen(PORT, () => {
  console.log(`Server run at port ${PORT}`)
})

module.exports = app;
