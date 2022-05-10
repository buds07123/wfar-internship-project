const mongoose = require('mongoose')

const wfarSchema = new mongoose.Schema({
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
    }]
})

const fullwfarSchema = new mongoose.Schema({
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
    info: [wfarSchema],
    isActive: {
        type: Boolean,
        default: true
    }
})

module.exports = wfar = mongoose.model('wfar', fullwfarSchema)