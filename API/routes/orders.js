const express = require('express');
const mongoose = require('mongoose');
const Order = require('../models/order');

const router = express.Router();

router.get('/', (req, res, next) => {
  Order.find()
  .exec()
  .then(data => {
      res.status(200).json({data: data})
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err})
  })
})

router.post('/', (req, res, next) => {
  const order = new Order({
    name: req.body.name,
    quantity: req.body.quantity
  })
  order.save()
  .then(data => {
    res.status(200).json({msg: 'post successful'})
  })
  .catch(err => {
    res.send(500).json(err)
  })
})

router.get('/:oid', (req, res, next) => {
  Order.findById(req.params.oid)
  .exec()
  .then(data => {
    if (data) {
      res.status(200).json({data: data})
    } else {
      res.status(404).json({msg: 'Order not found'})
    }
  })
  .catch(err => {
    res.status(500).json({err:err})
  })
})

router.delete('/:oid', (req, res, next) => {
  Order.deleteOne({_id: req.params.oid})
  .exec()
  .then(data => {
  //  console.log('deleted')
    if (data) {
    res.status(200).json({msg: "deleted"})
  } else {
    res.status(404).json({msg: "not found"})
  }
  })
  .catch(err => {
    res.status(500).json({err: err})
  })
})

module.exports = router