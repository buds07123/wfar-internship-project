const mongoose = require('mongoose')

const reportSchema = new mongoose.Schema({
    handler_id: {
        type: String,
        required: false
    },
    empId: {
        type: String,
        required: false
    },
    week_no: { 
        type: String,
        required: false
    },
    date: { 
        type: String,
        required: false
    },
    fname: { 
        type: String,
        required: false
    },
    email: { 
        type: String,
        required: false
    },
    status: { 
        type: String,
        required: false
    }
})


module.exports = report = mongoose.model('report',reportSchema)
