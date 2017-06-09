
const server = require('../server')
const Book = require('../models/Book')

const dummyBook = Book({
  name: 'BookTest',
  price: 100,
  author: 'J.R.R. Tolkien',
})

const updateBook = {
  name: 'BookSecond',
  price: 100,
  author: 'J.R.R. Tolkien',
}

const firstBook = Book({
  name: 'BookFirst',
  price: 100,
  author: 'J.R.R. Tolkien',
})

const dummyNumber = 0
let firstIndex = ''
const notFoundIndex = '5931221a6d0e00f95cf5f810'
let testIndex = ''

describe('/GET books request', () => {
  Book.remove({}, (err) => {
    if (err) res.send(err)
    else {
      firstBook.save((errInsert) => {
        if (errInsert) res.send(err)
      })
    }
  })
  it('it should GET all the books', (done) => {
    chai.request(server)
      .get('/books')
      .end((errGet, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        Book.find({ name: 'BookFirst' }, (errDB, docs) => {
          firstIndex = docs[0]._id
          done()
        })
      })
  })
})

describe('/POST books request', () => {
  it('it should POST book to database', (done) => {
    chai.request(server)
      .post('/books')
      .send(dummyBook)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.text.should.equal('Post Success !')
        Book.find({ name: 'BookTest' }, (errDB, docs) => {
          testIndex = docs[0]._id
          done()
        })
      })
  })
  it('it shouldn\'t POST book to database with no name field', (done) => {
    chai.request(server)
      .post('/books')
      .send({})
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.be.a('object')
        res.text.should.equal('Please insert name of the book')
        done()
      })
  })
})

describe('/GET single book request', () => {
  it('it should GET one of books', (done) => {
    chai.request(server)
      .get(`/books/${firstIndex}`)
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('name').equal('BookFirst')
        done()
      })
  })
  it('it shouldn\'t GET the book if wrong id format', (done) => {
    chai.request(server)
      .get(`/books/${dummyNumber}`)
      .end((err, res) => {
        res.should.have.status(200)
        res.text.should.equal('Wrong ID type')
        done()
      })
  })
  it('it should GET null if not found', (done) => {
    chai.request(server)
      .get(`/books/${notFoundIndex}`)
      .end((err, res) => {
        res.should.have.status(200)
        res.should.have.property('body').equal(null)
        done()
      })
  })
})

describe('/PUT single book request', () => {
  it('it should PUT one book', (done) => {
    chai.request(server)
      .put(`/books/${firstIndex}`)
      .send(updateBook)
      .end((err, res) => {
        res.should.have.status(200)
        res.text.should.equal('Update Success !')
        done()
      })
  })
})

describe('/GET -> PUT single book request', () => {
  it('it should GET one book', (done) => {
    chai.request(server)
      .get(('/books/').concat(firstIndex))
      .end((errGet, resGet) => {
        resGet.should.have.status(200)
        resGet.body.should.have.property('name').equal('BookSecond')
        chai.request(server)
        .put(`/books/${firstIndex}`)
        .send(firstBook)
        .end((errPut, resPut) => {
          resPut.should.have.status(200)
          resPut.text.should.equal('Update Success !')
          done()
        })
      })
  })
})

describe('/DELETE single book request', () => {
  it('it should GET one book', (done) => {
    chai.request(server)
      .delete(`/books/${testIndex}`)
      .end((errGet, res) => {
        res.should.have.status(200)
        res.text.should.equal('Delete Success !')
        done()
      })
  })
})
