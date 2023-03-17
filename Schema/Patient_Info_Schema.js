const mongoose = require("mongoose")

const JobsSchema = new mongoose.Schema({
    health_id: {
        type: Number,
        required: [true, "This field is must"],
        minlength: [10, "This Fild can not be less than 10 characters"],
        unique: true
    },
    fname: {
        type: String,
        required: [true, "This Field is Must"],
        maxlength: [10, "This Field can not be more than 10 characters"],
        minlength: [3, "This Field can not be more than 3 characters"]
    },
    lname: {
        type: String,
        required: [true, "This Field is Must"],
        maxlength: [10, "This Field can not be more than 10 characters"],
        minlength: [3, "This Field can not be more than 3 characters"]

    },
    sex: {
        type: String,
        required: [true, "This Field is must"],
        maxlength: [10, "This Field can not be more than 10 characters"],
        minlength: [3, "This Field can not be more than 3 characters"]
    },
    createdBy: {
        type: String
    }

}, { timestamps: true })

module.exports = mongoose.model('patient_details', JobsSchema);
