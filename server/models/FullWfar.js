const mongoose = require('mongoose')

const wfarSchema = new mongoose.Schema({
    empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        required: true,
    },
    school_year: { 
        type: String,
        required: true
    },
    semester: { 
        type: String,
        required: true
    },
    week_number: { 
        type: String,
        required: true
    },
    start_date: { 
        type: String,
        required: false
    },
    end_date: { 
        type: String,
        required: false
    },
    status: { 
        type: String,
        default: "For Checking"
    },
    comments: { 
        type: String,
        required: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
})

module.exports = full_wfar = mongoose.model('full_wfar', wfarSchema)