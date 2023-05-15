const User = require("../Schema/HIP_Credentials_Schema.js")
const StatusCode = require('http-status-codes')
require('dotenv').config();



const Register = async (req, res) => {
    try {
        // await User.deleteMany();
        console.log(req.ip)
        const user = await User.create({ ...req.body })
        const token = user.createJWT();
        res.status(StatusCode.CREATED).json({ message: "Successful", user: { name: user.name }, token })
    } catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}
const Login = async (req, res) => {
    try {
        const { email, password, hip_license, hip_number } = req.body;
        const user = await User.findOne({ email, hip_number, hip_license })
        if (!user) {
            res.status(StatusCode.BAD_REQUEST).json({ message: "No HealthCare Exist With Given Credentials" })
            return;
        }

        const Ispasswordcorrect = await user.comparePasswords(password)
        if (!Ispasswordcorrect) {
            res.status(StatusCode.UNAUTHORIZED).json({ message: "Incorrect Password" })
            return;
        }


        const token = user.createJWT();
        res.status(StatusCode.OK).json({ message: "Successful", user: { name: user.name }, token })
    }
    catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message })
    }
}


module.exports = {
    Register,
    Login
}