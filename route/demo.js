const express = require('express')
const path = require('path')

const demo = express.Router()

demo.use((req, res, next) => {
// Preempt
  next()
})

demo.route('/')
  .get((req, res) => {
    res.sendfile(path.resolve('public/views/index.html'))
  })
demo.route('/register')
  .get((req, res) => {
    res.sendfile(path.resolve('public/views/register.html'))
  })
demo.route('/payment')
  .get((req, res) => {
    res.sendfile(path.resolve('public/views/payment.html'))
  })
demo.route('/result')
  .get((req, res) => {
    res.sendfile(path.resolve('public/views/result.html'))
  })
demo.route('/getresult')
  .get((req, res) => {
    res.send({
      name: 'test'
    })
  })


module.exports = demo
