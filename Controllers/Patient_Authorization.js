const StatusCode = require("http-status-codes")
const Patient_Credentials = require("../Schema/Patient_CredentialSchema")
const Patient_Details = require("../Schema/Patient_Info_Schema")

const Patient_Register = async (req, res) => {
    try {
        let { health_id} = req.body
        const FindUser = await Patient_Details.findOne({ health_id })
        if (!FindUser) {
            res.status(StatusCode.BAD_REQUEST).json({ message: "No User is Registered With Given Health ID" })
            return;
        }
        req.body.name = FindUser.fname +" "+ FindUser.lname;
        const user = await Patient_Credentials.create(req.body)
        const token = user.P_createJWT();

        res.status(StatusCode.CREATED).json({ user: { name: user.name }, token })
    } catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message })
    }
}
 
const Patient_Login = async (req, res) => {
    try {
        const { health_id, password } = req.body
        const Patient = await Patient_Credentials.findOne({ health_id })
        if (!Patient) {
            res.status(StatusCode.BAD_REQUEST).json({ message: "No User Exits with Given Credentials Wait For HIPs to Verify Your Information" })
            return;
        }
        const IspasswordCorrect = await Patient.P_comparePass(password)
        if (!IspasswordCorrect) {
            res.status(StatusCode.BAD_REQUEST).json({ message: "Password is Not Correct!!" })
            return;
        }
        const token = Patient.P_createJWT();
        res.status(StatusCode.ACCEPTED).json({
            status: "Success",
            user: {
                name: Patient.name
            },
            token
        })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}



module.exports = {
    Patient_Register,
    Patient_Login
}