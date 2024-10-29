const jwt = require('jsonwebtoken');
const StatusCode = require("http-status-codes");
require('dotenv').config();

// From Firebase
const { HealthcareRequestLimit, CheckHealthcareAccountAvailability } = require("../Firebase/Service")
const { HealthcareRequestLimitmessage } = require("../NodeMailer/NodeMessages")

const authentication = async (req, res, next) => {

    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(StatusCode.NOT_ACCEPTABLE).json({ status: "Authentication Failed", message: "Could Not Verify your Request!" })
        return;
    }
    const token = authHeader.split(' ')[1];


    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET_KEY)
        req.user = { HealthcareID: payload.ID, name: payload.name, healthcareId: payload.healthcareId, email: payload.email, address: payload.address }
        // Firebase Rate Limiter
        const get = await CheckHealthcareAccountAvailability(req.user.healthcareId.toString())
        if (get.Total_request <= 0) {
            res.status(StatusCode.METHOD_NOT_ALLOWED).json({ status: "Request Limit Reached!", message: "Your Request Limit Reached mail 21vaibhav11@gmail.com for More Details!" })
            return
        }
        if (get.Total_request <= 1) {
            HealthcareRequestLimitmessage(req.user.name, req.user.healthcareId, req.user.email)
        }
        await HealthcareRequestLimit(req.user.healthcareId.toString())
        next();
    }
    catch (err) {
        res.status(StatusCode.NOT_ACCEPTABLE).json({ message: err.message })
    }
}

module.exports = authentication;