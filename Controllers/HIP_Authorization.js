const User = require("../Schema/HIP_Credentials_Schema.js")
const HealthCare = require("../Schema/HIP_Info_Schema")
const StatusCode = require('http-status-codes')
require('dotenv').config();



const Register = async (req, res) => {
    try {
        const { healthcareId, email } = req.body
        const IsHealthCare = await HealthCare.findOne({ HealthCareID: healthcareId, email })
        if (!IsHealthCare) {
            res.status(StatusCode.NOT_FOUND).json({ status: "Not Found!", message: "No HealthCare Found With Given HealthCare ID" })
            return
        }
        await User.create({ ...req.body })
        res.status(StatusCode.CREATED).json({ status: "Registered!" })
    } catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}
const Login = async (req, res) => {
    try {
        const { password, healthcarelicense, healthcareId } = req.body;
        const user = await User.findOne({ healthcareId, healthcarelicense })
        if (!user) {
            res.status(StatusCode.BAD_REQUEST).json({ message: "No HealthCare Exist With Given ID" })
            return;
        }

        const Ispasswordcorrect = await user.comparePasswords(password)
        if (!Ispasswordcorrect) {
            res.status(StatusCode.UNAUTHORIZED).json({ message: "Incorrect Password" })
            return;
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