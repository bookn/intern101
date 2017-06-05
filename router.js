const express = require('express')
const mongojs = require('mongojs')

const router = express.Router()
const db = mongojs('internjitta_test', ['books'])

router.use((req, res, next) => {
  // Preempt
  next()
})

router.route('/')
  .get((req, res) => {
    db.books.find({}, (err, docs) => {
      if (err) res.send(err)
      res.json(docs)
    })
  })
  .post((req, res) => {
    if (req.body.name) {
      db.books.insert(req.body, (err) => {
        if (err) res.send(err)
        res.send('Post Success !')
      })
    } else {
      res.send('Please insert name of the book')
    }
  })

router.route('/:id')
  .get((req, res) => {
    let id = req.params.id
    try {
      id = mongojs.ObjectId(id)
    } catch (err) {
      res.end('Wrong ID type')
    }
    db.books.findOne({ _id: id }, (err, docs) => {
      if (err) res.send(err)
      res.json(docs)
    })
  })
  .put((req, res) => {
    let id = req.params.id
    try {
      id = mongojs.ObjectId(id)
    } catch (err) {
      res.end('Wrong ID type')
    }
    db.books.findOne({ _id: id }, (err) => {
      if (err) res.send(err)
      const bookUpdate = req.body
      db.books.update({ _id: id }, bookUpdate, res.send('Update Success !'))
    })
  })
  .delete((req, res) => {
    let id = req.params.id
    try {
      id = mongojs.ObjectId(id)
    } catch (err) {
      res.end('Wrong ID type')
    }
    db.books.remove({ _id: id }, res.send('Delete Success !'))
  })

module.exports = router
