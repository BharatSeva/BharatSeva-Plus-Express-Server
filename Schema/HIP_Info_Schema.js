require('dotenv').config()
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const HIP_info_Schema = new mongoose.Schema({

    healthcareId: {
        type: Number,
        required: [true, "This Field is Must"],
        unique: true
    },
    healthcarelicense: {
        type: String,
        required: [true, "This is Field Cannot be Empty"],
        maxlength: 20,
        minlength: 4,
        unique: true
    },
    healthcareName: {
        type: String,
        required: [true, "HealthCare Name is Must"],
        maxlength: 20,
        unique: true,
        minlength: 5
    },
    email: {
        type: String,
        required: [true, "This Field is Must"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please Provide Valid E-Mail Address",
        ],
        unique: true,
    },
    address: {
        country: { type: String, required: [true, "country is Required"], maxlength: 10 },
        state: { type: String, required: [true, "State is Required"], maxlength: 15 },
        city: { type: String, required: [true, "city is Required"], maxlength: 10 },
        landmark: { type: String, required: [true, "landmark is Required"], maxlength: 15 },
    },
    availability: {
        type: String,
        required: [true, "This Field is Must"],
        minlength: 2,
        maxlength: 15
    },
    total_facilities: {
        type: Number,
        required: [true, "This Field is Must"],
        minlength: 4,
        maxlength: 15
    },
    total_mbbs_doc: {
        type: Number,
        required: [true, "This Field is Must"],
        minlength: 4,
        maxlength: 15
    },
    total_worker: {
        type: Number,
        required: [true, "This Field is Must"],
        minlength: 4,
        maxlength: 15
    },
    no_of_beds: {
        type: Number,
        required: [true, "This Field is Must"],
        minlength: 4,
        maxlength: 15
    },
    dateOfRegistration: {
        type: String,
        default: new Date()
    },
    password: {
        type: String,
        required: [true, "Please Provide this Field"],
        minlength: 3,
    }
})


HIP_info_Schema.pre('save', async function (next) {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    next();
})

HIP_info_Schema.methods.createJWT = function () {
    return jwt.sign({ ID: this._id, name: this.healthcareName, healthcareId: this.healthcareId, email: this.email, address: this.address }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_LIFETIME,
    })
}

// This one for compare password
HIP_info_Schema.methods.comparePasswords = async function (Userpassword) {
    const isMatch = await bcryptjs.compare(Userpassword, this.password)
    return isMatch
}




module.exports = mongoose.model("hip_info", HIP_info_Schema)