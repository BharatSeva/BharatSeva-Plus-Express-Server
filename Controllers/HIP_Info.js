const HIP_info = require("../Schema/HIP_Info_Schema")
const statusCode = require("http-status-codes")
const { DeleteHealthCareAccountmessage } = require("../NodeMailer/NodeMessages")

const CreateDetails = async (req, res) => {
    try {
        const create = await HIP_info.create(req.body)
        res.status(statusCode.CREATED).json({ message: "Successfully Created" });
    }
    catch (err) {
        res.status(statusCode.BAD_REQUEST).json({ Messsage: err.message })
    }
}


const GetDetails = async (req, res) => {
    try {
        const { HealthCareID } = req.params;
        const Find = await HIP_info.findOne({ HealthCareID }).select(['-__v', '-_id'])
        if (!Find) {
            res.status(statusCode.NOT_FOUND).json({ message: "No HealthCare Found For Given ID" });
            return
        }
        res.status(statusCode.OK).json({ HealthCare: Find });
    }
    catch (err) {
        res.status(statusCode.BAD_REQUEST).json({ message: err.message })
    }
}

const { DeleteHealthCareAccountChangePreferance } = require("../Firebase/Service")
const DeleteHealthCareAccount = async (req, res) => {
    try {
        const { healthcareId, name, email } = req.user
        // This One Will Send Mail To HealthCare
        DeleteHealthCareAccountmessage(name, healthcareId.toString(), email)
        DeleteHealthCareAccountChangePreferance(healthcareId)
        res.status(statusCode.OK).json({ messsage: "Account Scheduled for Deletion" })
    } catch (err) {
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({ messsage: "Something Unexpeted Happened!" })
    }
}


const updateDetails = async (req, res) => {

    try {
        const Update = await HIP_info.findOneAndUpdate({ HIPID: req.body.HIPID }, req.body, {
            new: true, runValidators: true
        })
        if (!Update) {
            res.status(statusCode.NOT_FOUND).json({ Message: `No HIP is found with ${req.body.HealthCareID}` })
            return;
        }
        res.status(statusCode.OK).json({ Status: "Success", details: Update })
    } catch (err) {
        res.status(statusCode.BAD_REQUEST).json({ message: err.message })
    }
}

module.exports = {
    CreateDetails,
    GetDetails,
    updateDetails,
    DeleteHealthCareAccount
}

