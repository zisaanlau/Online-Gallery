const express = require('express');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;

require('./model/db');

const index = require('./routes/index');
const users = require('./routes/users');


const app = express();

app.use(cors());

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(cookieParser());

app.use('/', index);
app.use('/users', users);

app.listen(port);
console.log(`Magic happens at http://localhost: ${port}`);

module.exports = app;
