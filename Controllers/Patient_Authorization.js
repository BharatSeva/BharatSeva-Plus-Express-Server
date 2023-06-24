const StatusCode = require("http-status-codes")
const Patient_Credentials = require("../Schema/Patient_CredentialSchema")
const Patient_Details = require("../Schema/Patient_Info_Schema")

const { LoginDetected, UserRegister } = require("../NodeMailer/NodeMessages")



const Patient_Register = async (req, res) => {
    try {
        let { health_id } = req.body
        const FindUser = await Patient_Details.findOne({ health_id })
        if (!FindUser) {
            res.status(StatusCode.BAD_REQUEST).json({ status: "No User Found With Given Health ID", message: "HealthCare Need To Register You Before You Login.." })
            return;
        }
        const IsUser = await Patient_Credentials.findOne({ health_id })
        if (IsUser) {
            res.status(StatusCode.BAD_REQUEST).json({ status: "User Already Registered!" })
            return
        }
        req.body.name = FindUser.fname + " " + FindUser.lname;
        if (FindUser.email === req.body.email) {
            await Patient_Credentials.create(req.body)
            res.status(StatusCode.CREATED).json({ status: "Successfully Registered" })
            // UserRegister(req.body.name, FindUser.health_id, FindUser.email)
        } else {
            res.status(StatusCode.BAD_REQUEST).json({ status: "Email Mismatched", message: "Use the same email address that you provided for HealthCare registration" })
        }
    } catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ status: "Something Bad Happened!" })
    }
}

const Patient_Login = async (req, res) => {
    try {
        const { health_id, password } = req.body
        const Patient = await Patient_Credentials.findOne({ health_id })
        if (!Patient) {
            res.status(StatusCode.BAD_REQUEST).json({ message: "No User Exits with Given Credentials" })
            return;
        }
        const IspasswordCorrect = await Patient.P_comparePass(password)
        if (!IspasswordCorrect) {
            res.status(StatusCode.BAD_REQUEST).json({ message: "Incorrect Password!" })
            return;
        }
        const token = Patient.P_createJWT();
        res.status(StatusCode.ACCEPTED).json({
            name: Patient.name,
            healthId: Patient.health_id,
            token
        })
        // LoginDetected(Patient.name, Patient.health_id, req.ip, Patient.email)
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}



module.exports = {
    Patient_Register,
    Patient_Login
}