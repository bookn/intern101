const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

const Schema = mongoose.Schema

const bookScheme = new Schema({
  name: String,
  price: Number,
  author: String
})

const Book = mongoose.model('Book', bookScheme)

module.exports = Book
