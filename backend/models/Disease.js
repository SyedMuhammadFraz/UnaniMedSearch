const mongoose = require('mongoose');

const DiseaseSchema = new mongoose.Schema({
    name: { type: String, required: true },
    symptoms: { type: String },
    description: { type: String },
    medicines: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medicine' }]
});

module.exports = mongoose.model('Disease', DiseaseSchema);
