const plus = require('../plus')
const server = require('../server')
const mongojs = require('mongojs')

const db = mongojs('internjitta_test', ['books'])
const dummyBook = {
  name: 'BookTest',
  price: 100,
  author: 'J.R.R. Tolkien',
}

const updateBook = {
  name: 'BookSecond',
  price: 100,
  author: 'J.R.R. Tolkien',
}

const firstBook = {
  name: 'BookFirst',
  price: 100,
  author: 'J.R.R. Tolkien',
}

const dummyNumber = 0
let firstIndex = ''
const notFoundIndex = '5931221a6d0e00f95cf5f810'
let testIndex = ''

describe('Function', () => {
  describe('plus', () => {
    it('should plus number correctly', () => {
      expect(plus(1, 2)).to.equal(3)
    })
    it('should plus number correctly', () => {
      expect(plus(2, 4)).to.equal(6)
    })
  })
})

describe('/GET books request', () => {
  const copyFirstBook = Object.assign({}, firstBook);
  db.books.drop((err) => {
    if (err) res.send(err)
    db.books.insert(copyFirstBook, (errInsert) => {
      if (errInsert) res.send(err)
    })
  })
  it('it should GET all the books', (done) => {
    chai.request(server)
      .get('/books')
      .end((errGet, res) => {
        res.should.have.status(200)
        res.body.should.be.a('array')
        db.books.findOne({ name: 'BookFirst' }, (errDB, docs) => {
          firstIndex = docs._id
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
        db.books.findOne({ name: 'BookTest' }, (errDB, docs) => {
          testIndex = docs._id
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
      .get(('/books/').concat(firstIndex))
      .end((err, res) => {
        res.should.have.status(200)
        res.body.should.have.property('name').equal('BookFirst')
        done()
      })
  })
  it('it shouldn\'t GET the book if wrong id format', (done) => {
    chai.request(server)
      .get(('/books/').concat(dummyNumber))
      .end((err, res) => {
        res.should.have.status(200)
        res.text.should.equal('Wrong ID type')
        done()
      })
  })
  it('it should GET null if not found', (done) => {
    chai.request(server)
      .get(('/books/').concat(notFoundIndex))
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
      .put(('/books/').concat(firstIndex))
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
        .put(('/books/').concat(firstIndex))
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
      .delete(('/books/').concat(testIndex))
      .end((errGet, res) => {
        res.should.have.status(200)
        res.text.should.equal('Delete Success !')
        done()
      })
  })
})
