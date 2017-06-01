const express = require('express')
const bodyParser = require('body-parser');
const router = require('./router');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/books', router);

app.listen(3000)

