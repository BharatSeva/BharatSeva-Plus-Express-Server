require('dotenv').config()
const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const GuestSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, "Name is Required!"],
        maxlength: 40,
        minlength: 3
    },
    email: {
        type: String,
        required: [true, "Email Is Must To have"],
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, "Please Provide Valid E-Mail Address",
        ],
        unique: true
    },
    picture: {
        type: String,
        require: [true, "Picture is Must"],
        unique: true
    },
    family_name: {
        type: String
    },
    sub: {
        type: String,
        unique: true
    },
    guest_type: {
        type: String,
        required: [true, "Type of User Is Required"]
    }
}, { timestamps: true })

GuestSchema.methods.CreateHealthUserGuestJWT = function () {
    return jwt.sign({ ID: this._id, name: this.name, email: this.email, healthId: this.sub }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_LIFETIME
    })
}

GuestSchema.methods.CreateHealthcare_GuestJWT = function () {
    return jwt.sign({ ID: this._id, name: this.name, email: this.email, healthcareId: this.sub }, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_LIFETIME
    })
}

module.exports = mongoose.model("guestlogin", GuestSchema)