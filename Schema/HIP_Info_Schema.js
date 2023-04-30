const mongoose = require("mongoose")

const HIP_info_Schema = new mongoose.Schema({
    
    HIPID:{
        type:Number,
        required:[true, "This Field is Must"],
        minlength:4,
        maxlength: 10,
        unique:true
    },
    name:{
        type:String,
        required:[true, "This Field is Must"],
        minlength:4,
        maxlength: 150
    },
    address:{
        type:String,
        required:[true, "This Field is Must"],
        minlength:4,
        maxlength: 150
    },
    Type:{
        type:String,
        required:[true, "This Field is Must"],
        minlength:4,
        maxlength: 150
    },
    availability:{
        type:String,
        required:[true, "This Field is Must"],
        minlength:2,
        maxlength: 15
    },
    total_facilities:{
        type:Number,
        required:[true, "This Field is Must"],
        minlength:4,
        maxlength: 15
    },
    total_mbbs_doc:{
        type:Number,
        required:[true, "This Field is Must"],
        minlength:4,
        maxlength: 15
    },
    total_worker:{
        type:Number,
        required:[true, "This Field is Must"],
        minlength:4,
        maxlength: 15
    },
    no_of_beds:{
        type:Number,
        required:[true, "This Field is Must"],
        minlength:4,
        maxlength: 15
    },
    registered_since:{
        type:Number,
        required:[true, "This Field is Must"],
        minlength:4,
        maxlength: 15
    },
    records_created:{
        type:Number,
        required:[true, "This Field is Must"],
        minlength:4,
        maxlength: 15
    },
    records_updated:{
        type:Number,
        required:[true, "This Field is Must"],
        minlength:4,
        maxlength: 15
    },
    records_viewed:{
        type:Number,
        required:[true, "This Field is Must"],
        minlength:4,
        maxlength: 15
    },
    dateOfRegistration:{
        type: String,
        default: new Date()
    }
})



module.exports = mongoose.model("hip_info", HIP_info_Schema)