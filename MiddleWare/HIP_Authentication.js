const jwt = require('jsonwebtoken');
const StatusCode = require("http-status-codes");
require('dotenv').config();



const authentication = (req, res, next)=>{
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith("Bearer")){
        res.status(StatusCode).json({msg:"Invalid Request, Authentication Failed"})
        return;
    }
    const token = authHeader.split(' ')[1];

    try{
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = { userID:payload.userID, name:payload.name }
        next();
    }
    catch(err){
        res.status(StatusCode.NOT_ACCEPTABLE).json({msg:err.message, message:"Token Can Not by Verified"})
    }
}

module.exports = authentication;