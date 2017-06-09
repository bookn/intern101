const express = require('express')
const Book = require('../models/Book')

const books = express.Router()

books.use((req, res, next) => {
  // preempt
  next()
})

books.route('/')
  .get((req, res) => {
    Book.find({}, (err, docs) => {
      if (err) res.send(err)
      else res.json(docs)
    })
  })
  .post((req, res) => {
    if (req.body.name) {
      const newBook = Book(req.body)
      newBook.save((err) => {
        if (err) res.send(err)
        else res.send('Post Success !')
      })
    } else {
      res.send('Please insert name of the book')
    }
  })

books.route('/:id')
  .get((req, res) => {
    const id = req.params.id
    Book.findById(id, (err, docs) => {
      if (err) res.end('Wrong ID type')
      else res.json(docs)
    })
  })
  .put((req, res) => {
    const id = req.params.id
    const bookUpdate = req.body
    Book.findByIdAndUpdate(id, bookUpdate, (err) => {
      if (err) res.end('Wrong ID type')
      else res.send('Update Success !')
    })
  })
  .delete((req, res) => {
    const id = req.params.id
    Book.findByIdAndRemove(id, (err) => {
      if (err) res.end('Wrong ID type')
      else res.send('Delete Success !')
    })
  })

module.exports = books
