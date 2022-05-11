const mongoose = require('mongoose')

const employeeSchema = new mongoose.Schema({
    ac_inCharge: {
        type: String,
        default: "None"
    },
    dh_inCharge: {
        type: String,
        default: "None"
    },
    emp_picture: { 
        type: String,
        required: false
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
    course: { 
        type: String,
        required: true
    },
    signature: { 
        type: String,
        required: false
    },
    position: { 
        type: String,
        required: true
    },
    updatedPosition: {
        type: String,
        default: "Faculty"
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
    status: {
        type: String,
        default: "Pending"
    },
    dateOfRequest: {
        type: String,
        required: false
    },
    password: { 
        type: String,
        required: true
    },
})

module.exports = employee = mongoose.model('employee',employeeSchema)