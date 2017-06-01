const chai = require('chai')
// const dirtyChai = require('dirty-chai')

process.env.NODE_ENV = 'test'
// chai.use(dirtyChai)
global.expect = chai.expect
