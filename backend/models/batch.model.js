const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const batchSchema = new Schema({
    name: {type: String, required: true},
    quantity: {type: Number, required: true},
    discountPercentage: {type: Number, default: 0},
    discountValue: {type: Number, default: 0}
}, {
    timestamps: true
})

const Batch = mongoose.model('Batch', batchSchema)

module.exports = Batch