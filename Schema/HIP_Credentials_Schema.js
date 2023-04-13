const bcryptjs = require("bcryptjs");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");



const HIPs_Credentials_Schema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "This Field is Must"],
        maxlength:20,
        unique:true,
        minlength:5
    },
    hip_number:{
        type:Number,
        required:[true, "This Field cannot be Empty"],
        minlength:4,
        maxlength:20,
        unique:true
    },
    hip_license:{
        type:Number,
        required:[true, "This is Field Cannot be Empty"],
        maxlength:20,
        minlength:4,
        unique:true
    },
    hip_address:{
        type:String,
        required:[true, "This field cannot be Empty"],
        maxlength:100,
        minlength:4
    },
    email:{
        type:String,
        required:[true, "This Field is Must"],
        match:[
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,"Please Provide Valid E-Mail Address",
        ],
        unique:true,
    },
    password:{
        type:String,
        required:[true, "Please Provide this Field"],
        minlength:3,
    },
})

HIPs_Credentials_Schema.pre('save',async function(next){
    const salt = await bcryptjs.genSalt(10)
    this.password = await bcryptjs.hash(this.password, salt)
    next();
})

HIPs_Credentials_Schema.methods.createJWT = function() {
    return jwt.sign({userID:this._id, name:this.name}, process.env.JWT_SECRET_KEY, {
        expiresIn: process.env.JWT_LIFETIME,
    })
}

// This one for compare password
HIPs_Credentials_Schema.methods.comparePasswords = async function(Userpassword){
    const isMatch = await bcryptjs.compare(Userpassword, this.password)
    return isMatch
}


module.exports = mongoose.model('HIP_credentials', HIPs_Credentials_Schema);

