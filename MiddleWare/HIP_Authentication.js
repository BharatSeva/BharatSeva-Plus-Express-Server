const jwt = require('jsonwebtoken');
const StatusCode = require("http-status-codes");
require('dotenv').config();



const authentication = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(StatusCode.NOT_ACCEPTABLE).json({ status: "Authentication Failed", message:"Could Not Verify your Request!" })
        return;
    }
    const token = authHeader.split(' ')[1];

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = { userID: payload.ID, name: payload.name, healthcareId: payload.healthcareId, email: payload.email }
        // console.log(req.user)
        next();
    }
    catch (err) {
        res.status(StatusCode.NOT_ACCEPTABLE).json({ message: err.message })
    }
}

module.exports = authentication;