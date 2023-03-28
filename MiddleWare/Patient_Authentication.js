const jwt = require("jsonwebtoken")
const StatusCode = require("http-status-codes")

require('dotenv').config();


const Patient_Authentication = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith("Bearer")) {
        res.status(StatusCode.BAD_REQUEST).json({ message: "Invalid Request, Token expired" })
        return;
    }
    const token = authHeader.split(' ')[1];


    try {
        const patient_payload = jwt.verify(token, process.env.Patient_JWT_SECRET_KEY)
        req.user = { userID: patient_payload.Patient_USERID, name: patient_payload.name }
        console.log(req.user);
        next();
    } catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}

module.exports = Patient_Authentication