const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const hangtagSchema = new Schema({
    batchId: {type: String},
    ownerId: {type: String}
})

const Hangtag = mongoose.model('Hangtag', hangtagSchema)

module.exports = Hangtag