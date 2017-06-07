const mongoose = require('mongoose')
mongoose.Promise = require('bluebird')
const config = require('../config').mongo

mongoose.connect(`mongodb://${config.host}:${config.port}/${config.database}`)

const Schema = mongoose.Schema

const bookScheme = new Schema({
  name: String,
  price: Number,
  author: String
})

const Book = mongoose.model(config.nameCollection, bookScheme)

module.exports = { Book }
