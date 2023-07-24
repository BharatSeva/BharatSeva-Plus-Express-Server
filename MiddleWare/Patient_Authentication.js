const jwt = require("jsonwebtoken")
const StatusCode = require("http-status-codes")
require('dotenv').config();

// From Firebase
const { IncreaseRequestLimit, GetHealthUserSettingForServer } = require("../Firebase/Service")
const { AccountSuspended } = require("../NodeMailer/NodeMessages")


const Patient_Authentication = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(StatusCode.UNAUTHORIZED).json({ message: "Invalid Request, Token expired" })
        return;
    }
    const token = authHeader.split(' ')[1];
    try {
        const patient_payload = jwt.verify(token, process.env.Patient_JWT_SECRET_KEY)
        req.user = { ID: patient_payload.ID, name: patient_payload.name, healthId: patient_payload.healthId, email: patient_payload.email }
        // This One For Rate Limit Checking
        let Count = await GetHealthUserSettingForServer(patient_payload.healthId.toString())
        if (!Count.Total_request) {
            res.status(StatusCode.METHOD_NOT_ALLOWED).json({ status: "Account Suspended!", message: "Request Blocked Due to Request Limit Reached, Mail to 21vaibahv11@gmail.com to Continue Service!" })
            return
        }
        if (Count.Total_request == 1) {
            AccountSuspended(patient_payload.name, patient_payload.email)
        }
        await IncreaseRequestLimit(patient_payload.healthId.toString())
        next();
    } catch (err) {
        res.status(StatusCode.UNAUTHORIZED).json({ message: err.message })
    }
}

module.exports = Patient_Authentication