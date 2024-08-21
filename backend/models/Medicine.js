const mongoose = require('mongoose');

const MedicineSchema = new mongoose.Schema({
    name: { type: String, required: true },
    ingredients: { type: String },
    usage: { type: String },
    price: { type: Number, required: true }
});

module.exports = mongoose.model('Medicine', MedicineSchema);
