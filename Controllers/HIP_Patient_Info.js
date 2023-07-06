const Jobs = require("../Schema/Patient_Info_Schema")
const StatusCode = require("http-status-codes")
const { GreetPatient, HealthcareViewBioData } = require("../NodeMailer/NodeMessages")

// From Firebase
const { HealthCare_ViewBioDataStats, CreateUserInFirebase } = require("../Firebase/Service")

// This Will Get User Bio Data For HealthCare ONly
const Get_UserBioData = async (req, res) => {
    try {
        const { health_id } = req.params
        const User = await Jobs.findOne({ health_id }).select(["-_id", "-__v"])
        if (!User) {
            res.status(StatusCode.NOT_FOUND).json({ message: "No One With Given Health ID" })
            return
        }
        const { name, healthcareId, address } = req.user
        HealthCare_ViewBioDataStats(name, healthcareId.toString(), health_id.toString(), address)
        await HealthcareViewBioData(User.fname, healthcareId, name, User.email, req.ip)
        res.status(StatusCode.ACCEPTED).json({ User })
    } catch (err) {
        console.log(err.message)
        res.status(StatusCode.BAD_REQUEST).json({ message: "Something Bad Happened!" })
    }
}
// From Firebase

const CreateBioData = async (req, res) => {
    try {
        const { name, healthcareId } = req.user
        await Jobs.create({ ...req.body, healthcareId, healthcareName: name })
        res.status(StatusCode.CREATED).json({ message: "Successfully Created!" })
        await GreetPatient(req.body.email, req.body.fname, name)
        CreateUserInFirebase(req.body.health_id.toString(), healthcareId.toString())
    }
    catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message })
    }
}
module.exports = {
    Get_UserBioData,
    CreateBioData
}

