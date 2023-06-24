const StatusCode = require('http-status-codes')
const Appointment = require("../Schema/Appointments")


const CreateAppointment = async (req, res) => {
    const { healthcareID, health_ID } = req.params
    try {
        const data = await Appointment.create({ ...req.body, healthcareID, health_ID })
        res.status(StatusCode.CREATED).json({ message: "Successfully Created", data: data })
    } catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message })
    }
}

const GetAppointment_User = async (req, res) => {
    const { health_ID } = req.params
    try {
        const data = await Appointment.find({ health_ID }).select(['-__v', '-_id']).sort("-appointment_date")
        if(!data.length){
            res.status(StatusCode.NOT_FOUND).json({ message:"No Any Appointment Log Found !" })
            return
        }
        res.status(StatusCode.OK).json({ data })
    } catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message })
    }
}
const GetAppointment_HealthCare = async (req, res) => {
    const { healthcareID } = req.params
    try {
        const data = await Appointment.find({ healthcareID }).select(['-__v', '-_id'])
        if(!data.length){
            res.status(StatusCode.NOT_FOUND).json({ message:"No Any Appointment Log Found !" })
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
    GetAppointment_HealthCare
}