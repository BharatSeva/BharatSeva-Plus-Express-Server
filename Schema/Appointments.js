const mongoose = require("mongoose")

const Appoinments = new mongoose.Schema({
    healthcareID: {
        type: String,
        required: [true, "HealthCare ID is Required"],
        maxlength: 30
    },
    appointment_date: {
        type: String,
        required: [true, "Date Is Required"]
    },
    appointment_time: {
        type: String,
        required: [true, "Time Is Required"]
    },
    health_ID: {
        type: String,
        required: [true, "Health_ID Is Required"],
        maxlength: 30
    },
    department: {
        type: String,
        required: [true, "Department Is must to have"],
        maxlength: 50
    },
    note: {
        type: String,
        maxlength: 30
    },
    name: {
        type: String,
        required: [true, "HealthUser Name is Required"],
        maxlength: 30
    },
    healthcare_name: {
        type: String,
        required: [true, "HealthCare Name is Required"],
        maxlength: 30
    }
}, { timestamp: true })


module.exports = mongoose.model("appointments", Appoinments)