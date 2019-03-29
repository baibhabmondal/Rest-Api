const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({
    name: String,
    latitude: Number,
    longitude: Number
});

module.exports = mongoose.model('Store', storeSchema);