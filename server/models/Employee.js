const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    emp_picture: { 
        type: String,
        required: true
    },
    emp_number: { 
        type: String,
        required: true
    },
    fname: { 
        type: String,
        required: true
    },
    mname: { 
        type: String,
        required: false
    },
    lname: { 
        type: String,
        required: true
    },
    name_extension: { 
        type: String,
        required: false
    },
    position: { 
        type: String,
        required: true
    },
    username: { 
        type: String,
        required: true,
        unique: true
    },
    email: { 
        type: String,
        required: true,
        unique: true
    },
    isVerified:{
        type: Boolean,
        default: false,
    },
    password: { 
        type: String,
        required: true
    }
})

module.exports = employee = mongoose.model('employee',employeeSchema)