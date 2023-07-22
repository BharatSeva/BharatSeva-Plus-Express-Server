const HIP_info = require("../Schema/HIP_Info_Schema")
const statusCode = require("http-status-codes")
const { DeleteHealthCareAccountmessage } = require("../NodeMailer/NodeMessages")

// Get HealthCare Details For HIP Bio Data
const GetDetails = async (req, res) => {
    try {
        const { healthcareId } = req.user;
        const Find = await HIP_info.findOne({ healthcareId }).select(['-__v', '-_id', '-password'])
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

// From Firebase
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


// This One Is for Healthcare Appointment Section
const appointment = require("../Schema/Appointments")
const HealthcareAppointment = async (req, res) => {
    try {
        const { healthcareId } = req.user
        const appoint = await appointment.find({ healthcareID: healthcareId }).select(["-_id", "-__v"]).sort("-appointment_date")
        if (!appoint) {
            res.status(statusCode.NOT_FOUND).json({ message: "No AnyAppointment Yet!" })
            return
        }
        res.status(statusCode.OK).json({ appointments: appoint })
    } catch (err) {
        console.log(err.message)
        res.status(statusCode.INTERNAL_SERVER_ERROR).json({ message: "Something Unexpected Happened!" })
    }

}


module.exports = {
    GetDetails,
    updateDetails,
    DeleteHealthCareAccount,
    HealthcareAppointment,
}

