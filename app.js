require('dotenv').config();
const express = require('express');
const path = require('path');
const indexRouter = require('./routes/index');
const checkoutRouter = require('./routes/checkout');

const app = express();

// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/checkout', checkoutRouter);

module.exports = app;
