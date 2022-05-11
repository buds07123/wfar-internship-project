const mongoose = require('mongoose')

const adminSchema = new mongoose.Schema({
    picture: { 
        type: String,
        required: false
    },
    first_name: { 
        type: String,
        required: true
    },
    middle_name: { 
        type: String,
        required: true
    },
    last_name: { 
        type: String,
        required: true
    },
    username: { 
        type: String,
        required: true
    },
    email: { 
        type: String,
        required: true
    },
    password: { 
        type: String,
        required: true
    }
})

module.exports = admin = mongoose.model('admin',adminSchema)