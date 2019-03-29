const express = require('express');
const productRoute = require('./API/routes/product');
const orderRoute = require('./API/routes/orders');
const storeRoute = require('./API/routes/store');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://baibhabmondal:test123@ds055732.mlab.com:55732/nodetest', {
  useNewUrlParser: true
})
.then((data) => {console.log("database set up")})
.catch(err => {console.log(err)})

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', '*');
  if (req.method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', 'GET, PUT, PATCH, DELETE, POST');
    return res.status(200).json();
  }
  next();
})

app.use('/products', productRoute)
app.use('/orders',orderRoute)
app.use('/store', storeRoute)

app.use((req, res, next) => {
  const error = new Error('Not found');
  error.status = 404
  next(error);
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    msg: err.message
  })
})


module.exports = app;