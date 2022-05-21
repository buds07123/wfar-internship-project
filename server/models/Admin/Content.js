const mongoose = require('mongoose')

const contentSchema = new mongoose.Schema({
    announcement: {
        type: String,
        required: false
    },
    vision: {
        type: String,
        required: false
    },
    mission: {
        type: String,
        required: false
    },
    goals: {
        type: String,
        required: false
    },
    objectives: {
        type: String,
        required: false
    }
})

module.exports = content = mongoose.model('content',contentSchema)