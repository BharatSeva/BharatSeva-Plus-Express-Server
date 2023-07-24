const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
require('dotenv').config();


const PatientCredentials_Schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name Is not Provided"],
        maxlenght: 20,
    },
    email: {
        type: String,
        required: [true, "E-Mail Is not Provided"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please Provide Valid E-Mail Address",
        ],
        unique: true
    },
    health_id: {
        type: Number,
        required: [true, "Health ID is not provided"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Password is not provided"],
        minlength: 5,
    }
}, { timestamps: true })



PatientCredentials_Schema.pre('save', async function (next) {
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    next();
})

PatientCredentials_Schema.methods.P_createJWT = function () {
    return jwt.sign({ ID: this._id, name: this.name, healthId: this.health_id, email: this.email }, process.env.Patient_JWT_SECRET_KEY, {
        expiresIn: process.env.Patient_JWT_LIFETIME,
    })
}

PatientCredentials_Schema.methods.P_comparePass = async function (password) {
    const isMatch = await bcryptjs.compare(password, this.password)
    return isMatch
}



module.exports = mongoose.model("Patient_Credentials", PatientCredentials_Schema)