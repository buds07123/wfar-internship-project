const mongoose = require('mongoose')

const wfarSchema = new mongoose.Schema({
    empId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "employee",
        required: true,
    },
    week_number: { 
        type: String,
        required: true
    },
    date: { 
        type: String,
        required: true
    },
    subject: { 
        type: String,
        required: true
    },
    course: { 
        type: String,
        required: true
    },
    year: { 
        type: String,
        required: true
    },
    section: { 
        type: String,
        required: true
    },
    attendee: { 
        type: String,
        required: true
    },
    recording_link: { 
        type: String,
        required: true
    },
    activity: { 
        type: String,
        required: true
    },
    meet_screenshots: [{ 
        type: String,
        required: false
    }],
    act_screenshots: [{ 
        type: String,
        required: false
    }],
    isActive: {
        type: Boolean,
        default: true
    }
})

module.exports = wfar = mongoose.model('wfar', wfarSchema)