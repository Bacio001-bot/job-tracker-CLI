const mongoose = require('mongoose');

const jobSchema = mongoose.Schema({
    job: {type: String},
    Employer: {type: String},
    description: {type: String},
    price: {type: Number},
    finished: {type: Boolean},
    paid: {type: Boolean},
    date: {type: Date}
});

module.exports = mongoose.model('job',jobSchema);