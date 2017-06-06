const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')

mongoose.connect('mongodb://localhost:27017/internjitta_test')
const Schema = mongoose.Schema
const collectionName = 'books'
const bookScheme = new Schema({
  name: String,
  price: Number,
  author: String
})
const Book = mongoose.model('Book', bookScheme, collectionName)

module.exports = Book
