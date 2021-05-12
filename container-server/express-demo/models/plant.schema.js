const mongoose = require('mongoose');

const PlantSchema = mongoose.Schema({
    name: String,
    description: String,
    img: String
});

module.exports = mongoose.model('Plants', PlantSchema);