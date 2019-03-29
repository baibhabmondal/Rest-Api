const express = require('express');
const mongoose = require('mongoose');
const store = require('../models/stores');

const router = express.Router();

router.get('/', (req, res, next) => {
  store.find()
    .exec()
    .then(data => {
      if (data)
        res.status('200').json({ "data": data });
      else
        res.status('404').json({ "data": "Store not found" });
    })
    .catch(err => console.log(err));
})

router.get('/:id', (req, res, next) => {
  store.findById({ _id: req.params.id })
    .exec()
    .then(data => {
      if (data)
        res.status(200).json({ "data": data });
      else
        res.status(404).json({ "data": "The Store does not exist" });
    })
    .catch(err => console.log(err));
})

router.post('/', (req, res, next) => {
  const Store = new store({
    "name": req.body.name,
    "latitude": req.body.lat,
    "longitude": req.body.long
  })
  Store.save()
  .then(data => {
    if(data)
      res.status(200).json({"msg": "POST Successful"});
    else
      res.status(500).json({"msg": "Unsuccessful"});
  })
  .catch(err => console.log(err));
})

module.exports = router;