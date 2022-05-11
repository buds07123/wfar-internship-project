const mongoose = require('mongoose')

const batchSchema = new mongoose.Schema({
    school_year: {
        type: String,
        unique: true,
        required: true
    },
    // semester: {
    //     type: String,
    //     required: true
    // },
    week_number: {
        type: String,
        required: true
    }
})

module.exports = batch = mongoose.model('batch',batchSchema)
