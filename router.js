const express = require('express')
const mongojs = require('mongojs')

const router = express.Router()
const db = mongojs('internjitta', ['books']);

router.use((req, res, next) => {
  // Preempt
  next()
})

router.route('/')
  .get((req, res) => {
    db.books.find({}, (err, docs) => {
      res.json(docs)
    });
  })
  .post((req, res) => {
    if ('name' in req.body) {
      db.books.insert(req.body, (err) => {
        if (err) {
          res.send(err)
        }
        res.send('Post Success !')
      })
    } else {
      res.send('Please insert name of the book ')
    }
  })

router.route('/:id')
  .get((req, res) => {
    const id = req.params.id;
    db.books.findOne({ _id: mongojs.ObjectId(id) }, (err, docs) => {
      if (err) {
        res.json(err)
      }
      res.json(docs)
    });
  })
  .put((req, res) => {
    const id = req.params.id
    db.books.findOne({ _id: mongojs.ObjectId(id) }, (err) => {
      if (err) {
        res.send(err)
      }
      const bookUpdate = req.body
      db.books.update({ _id: mongojs.ObjectId(id) }, bookUpdate, res.send('Update Success !'))
    })
  })
  .delete((req, res) => {
    const id = req.params.id
    db.books.remove({ _id: mongojs.ObjectId(id) }, res.send('Delete Success !'))
  })

module.exports = router;
