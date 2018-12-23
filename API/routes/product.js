const express = require('express');
const mongoose = require('mongoose');
const Product = require('../models/product');

const router = express.Router();

router.get('/', (req, res, next) => {
  Product.find()
  .exec()
  .then(data => {
      res.status(200).json({data: data})
  })
  .catch(err => {
    res.status(500).json({err: err})
    console.log(err)
  })
})
router.post('/', (req, res, next) => {
    const product = new Product({
      name: req.body.name,
      price: req.body.price
    })
    product.save()
    .then(data => {
      console.log(data)
      res.status(200).json({msg: 'Data post successful'})
    })
    .catch(err => {
      console.log(err)
      res.status(500).json(err)
    })
})
router.get('/:pid', (req, res, next) => {
  Product.findById(req.params.pid)
  .exec()
  .then(data => {
    if (data) {
      res.status(200).json({
        data: data
      })
    } else {
      res.status(500).json({msg: "Could not find product"})
    }
  })
  .catch(err => {
    res.status(500).json({
      err: err
    })
  })
})
router.patch('/:pid', (req, res, next) => {
  const id = req.params.pid;
  const name = req.body.name;
  const price = req.body.price;
  Product.updateOne({_id: id}, {
    name: name,
    price: price
  })
  .exec()
  .then(data => {
    if (data) {
      res.status(200).json({data: data})
    } else {
      res.status(404).json({msg: "not found"})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({err: err})
  })
})

router.delete('/:pid', (req, res, next) => {
  const id = req.params.pid;
  Product.deleteOne({_id: id})
  .exec()
  .then(data => {
    if (data) {
      console.log(data)
      res.status(200).json({msg: `Deleted Product ${id}`})
    } else {
      res.status(404).json({msg: 'Product not found'})
    }
  })
  .catch(err => {
    console.log(err)
    res.status(500).json({error: err})
  })
})

module.exports = router;