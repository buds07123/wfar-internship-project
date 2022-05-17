const mongoose = require('mongoose')

const facultyAssign = new mongoose.Schema({
    assignToID:{
        type: String,
        required: false
    },
    empID:{
        type: String,
        required: false
    },
    fname:{
        type: String,
        required: false
    },
    mname:{
        type: String,
        required: false
    },
    lname:{
        type: String,
        required: false
    },
    position:{
        type: String,
        required: false
    }
})

const employeeSchema = new mongoose.Schema({
    handlerAC_ID: {
        type: String,
        required: false
    },
    ac_inCharge: {
        type: String,
        default: "None"
    }, 
    handlerDH_ID: {
        type: String,
        required: false
    },
    dh_inCharge: {
        type: String,
        default: "None"
    },
    assignTo: [facultyAssign],
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