const mongoose = require("mongoose")

const JobsSchema = new mongoose.Schema({
    health_id: {
        type: String,
        required: [true, "This field is must"],
        minlength: [10, "This field can not be less than 10 characters"],
        maxlength: [40, "This field can not be more than 10 characters"],
        unique: true
    },
    fname: {
        type: String,
        required: [true, "This Field is Must"],
        maxlength: [10, "This Field can not be more than 10 characters"],
        minlength: [3, "This Field can not be Less than 3 characters"]
    },
    middlename: {
        type: String,
        maxlength: [10, "This Field can not be more than 10 characters"]
    },
    lname: {
        type: String,
        required: [true, "This Field is Must"],
        maxlength: [10, "This Field can not be more than 10 characters"],
        minlength: [3, "This Field can not be Less than 3 characters"]

    },
    sex: {
        type: String,
        required: [true, "This Field is must"],
        maxlength: [5, "This Field can not be more than 10 characters"],
        minlength: [1, "This Field can not be Less than 3 characters"]
    },
    healthcareId: {
        type: Number,
        required: [true, "HealthCare ID is Must to have"]
    },
    healthcareName: {
        type: String,
        required: [true, "Healthcare Name is Must"],
        maxlength: [30, "Healthcare Name cannot be more than 30 characters"],
        minlength: [1, "Healthcare Name cannot be less than 1"]
    },
    dob: {
        type: String,
        required: [true, "DOB is Must"],
        maxlength: [15, "DOB cannot be more than 10"],
        minlength: [1, "DOB cannot be less than 1"]
    },
    bloodgrp: {
        type: String,
        required: [true, "blood Group is Must"],
        maxlength: [20, "blood Group cannot be more than 10"],
        minlength: [1, "blood Group cannot be less than 1"]
    },
    BMI: {
        type: String,
        required: [true, "BMI is Must"],
        maxlength: [10, "BMI cannot be more than 10"],
        minlength: [1, "BMI cannot be less than 1"]
    },
    MarriageStatus: {
        type: String,
        required: [true, "MarriageStatus is Must"],
        maxlength: [20, "MarriageStatus cannot be more than 10"],
        minlength: [1, "MarriageStatus cannot be less than 1"]
    },
    Weight: {
        type: String,
        required: [true, "Weight is Must"],
        maxlength: [10, "Weight cannot be more than 10"],
        minlength: [1, "Weight cannot be less than 1"]
    },
    email: {
        type: String,
        required: [true, "Email is Must"],
        maxlength: [50, "Email cannot be more than 10"],
        minlength: [1, "Email cannot be less than 1"],
        unique: true
    },
    mobilenumber: {
        type: String,
        required: [true, "Mobile Number is Must"],
        maxlength: [10, "Mobile Number cannot be more than 10"],
        minlength: [1, "Mobile Number cannot be less than 1"]
    },
    aadharNumber: {
        type: String,
        required: [true, "Aadhaar is Must"],
        maxlength: [20, "Aadhaar cannot be more than 10"],
        minlength: [1, "Aadhaar cannot be less than 1"]
    },
    Primarylocation: {
        type: String,
        required: [true, "Location is Must"],
        maxlength: [50, "Location cannot be more than 10"],
        minlength: [1, "Location cannot be less than 1"]
    },
    sibling: {
        type: String,
        required: [true, "sibling is Must"],
        maxlength: [10, "sibling cannot be more than 10"],
        minlength: [1, "sibling cannot be less than 1"]
    },
    twin: {
        type: String,
        required: [true, "twin is Must"],
        maxlength: [10, "twin cannot be more than 10"],
        minlength: [1, "twin cannot be less than 1"]
    }
    ,
    fathername: {
        type: String,
        required: [true, "fathername is Must"],
        maxlength: [10, "fathername cannot be more than 10"],
        minlength: [1, "fathername cannot be less than 1"]
    },
    mothername: {
        type: String,
        required: [true, "mothername is Must"],
        maxlength: [10, "mothername cannot be more than 10"],
        minlength: [1, "mothername cannot be less than 1"]
    },
    emergencynumber: {
        type: String,
        required: [true, "emergencynumber is Must"],
        maxlength: [10, "emergencynumber cannot be more than 10"],
        minlength: [1, "emergencynumber cannot be less than 1"]
    }

}, { timestamps: true })

module.exports = mongoose.model('patient_details', JobsSchema);
