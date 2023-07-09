const StatusCode = require('http-status-codes')
const Appointment = require("../Schema/Appointments")

// From Firebase
const { AppointmentCounter } = require("../Firebase/Service")

const CreateAppointment = async (req, res) => {
    const { healthcareID } = req.params
    try {
        const { name, healthId } = req.user
        await Appointment.create({ ...req.body, healthcareID, health_ID: healthId, name })
        res.status(StatusCode.CREATED).json({ message: "Appointment Successfully Created" })
        AppointmentCounter(healthcareID.toString(), healthId.toString())
    } catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message })
    }
}

const GetAppointment_User = async (req, res) => {
    const { healthId } = req.user
    try {
        const data = await Appointment.find({ health_ID: healthId }).select(['-__v', '-_id']).sort("-appointment_date")
        if (!data.length) {
            res.status(StatusCode.NOT_FOUND).json({ message: "No Any Appointment Log Found !" })
            return
        }
        res.status(StatusCode.OK).json({ data })
    } catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message })
    }
}
module.exports = {
    CreateAppointment,
    GetAppointment_User,
}