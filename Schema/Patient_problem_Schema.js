const mongoose = require("mongoose")


const Patient_Problem = new mongoose.Schema({
    p_problem: {
        type: String,
        required: [true, "Problem field is Required"],
        minlength: 3
    },
    description: {
        type: String,
        required: [true, "Description Field is Required"],
        minlength: 3
    },
    health_id: {
        type: Number,
        required: [true, "Health ID is Must to have"]
    },
    healthcareName: {
        type: String,
        required: [true, "HealthCare Name can not be Empty"]
    },
    medical_severity: {
        type: String,
        required: [true, "Severity of Your Condition is Required"]
    },
    Created_At: {
        type: String,
        default: new Date(),
    }
})

module.exports = mongoose.model("Patient_Problem", Patient_Problem)