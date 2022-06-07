const mongoose = require('mongoose')

const notifSchema = new mongoose.Schema({
    picture:{
        type: String,
        required: false
    },
    name:{
        type: String,
        required: false
    },
    position:{
        type: String,
        required: false
    },
    empId:{
        type: String,
        required: false
    },
    message:{
        type: String,
        required: false
    },
    time: {
        type: String,
        required: false
    },
    dateToday: {
        type: String,
        required: false
    }
})


module.exports = notification = mongoose.model('notification',notifSchema)