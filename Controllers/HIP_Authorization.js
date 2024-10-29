const HealthCare = require("../Schema/HIP_Info_Schema")
const StatusCode = require('http-status-codes')
require('dotenv').config();

// From Firebase
const { CreateHealthCareInFirebase, CheckHealthcareAccountAvailability, HealthcareBrowserDataF } = require("../Firebase/Service")


const Register = async (req, res) => {
    try {
        const { about, appointment_fee, healthcareName, healthcareId, state, country, city, landmark } = req.body
        if (!about || !appointment_fee || !state || !country || !landmark || !city) {
            res.status(StatusCode.BAD_REQUEST).json({ message: "Required parameters are missing!" });
            return
        }
        let name = healthcareName, address = { state, country, city, landmark }
        CreateHealthCareInFirebase(healthcareId.toString(), name, about, appointment_fee.toString(), location = { state, country, city, landmark })
        await HealthCare.create({ ...req.body, address })
        res.status(StatusCode.CREATED).json({ message: "Successfully Created" });
    }
    catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ Messsage: err.message })
    }
}


// This one for Login Healthcare

const Login = async (req, res) => {
    try {
        const { password, healthcarelicense, healthcareId, LoginDT } = req.body;
        const user = await HealthCare.findOne({ healthcareId, healthcarelicense })
        if (!user) {
            res.status(StatusCode.BAD_REQUEST).json({ message: "No HealthCare Exist With Given ID" })
            return;
        }

        const Ispasswordcorrect = await user.comparePasswords(password)
        if (!Ispasswordcorrect) {
            res.status(StatusCode.UNAUTHORIZED).json({ message: "Incorrect Password" })
            return;
        }

        const Isok = await CheckHealthcareAccountAvailability(healthcareId.toString())
        if (Isok.Acccount_Deletion) {
            res.status(451).json({ status: "Account Deletion Scheduled", message: "Mail 21vaibhav11@gmail.com With HealthcareId to Remove Deletion Schedule!" })
            return
        }

        // Healthcare Login Data Goes here
        const IP = req.ip
        await HealthcareBrowserDataF(healthcareId, { IP, LoginDT })

        if (Isok.Total_request <= 0) {
            res.status(StatusCode.METHOD_NOT_ALLOWED).json({ status: "Account Request Limit Over", message: "You Have Used All Of Your Request Quota. Mail 21vaibhav11@gmail.com With HealthcareId to Increase the Limit!" })
            return
        }

        const token = user.createJWT();
        res.status(StatusCode.OK).json({ name: user.healthcareName, token, healthcareId })
    }
    catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message })
    }
}


module.exports = {
    Register,
    Login
}