const StatusCode = require("http-status-codes")
const PatientProblem_Schema = require("../Schema/Patient_problem_Schema")
const Patient_Info = require("../Schema/Patient_Info_Schema")

// From Firebase
const { Healthcare_RecordsCreated_Stats, HealthCare_RecordsViewed_Stats } = require("../Firebase/Service")


const Create_PatientProblem = async (req, res) => {
    try {
        const { health_id } = req.body
        const FindPatient = await Patient_Info.findOne({ health_id })
        if (!FindPatient || !health_id) {
            res.status(StatusCode.BAD_REQUEST).json({ message: `No Patient Exist With ${health_id}` })
            return;
        }
        const { name, healthcareId, address } = req.user
        const info = await PatientProblem_Schema.create({ ...req.body, healthcareName: name })
        await Healthcare_RecordsCreated_Stats(name, healthcareId.toString(), health_id.toString(), address)
        res.status(StatusCode.CREATED).json({ message: "Successfully Created!" })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}

const GetPatient_Records = async (req, res) => {
    try {
        const { healthId } = req.query
        const GET = await Patient_Info.findOne({ health_id: healthId })
        if (!GET) {
            res.status(StatusCode.NOT_FOUND).json({ status: "No One With Given HealthID" })
            return
        }
        const HealthUser = await PatientProblem_Schema.find({ health_id: healthId }).select(["-__v", "-_id"]).sort("Created_At")
        const { name, healthcareId, address } = req.user
        await HealthCare_RecordsViewed_Stats(name, healthcareId.toString(), healthId, address)
        res.status(StatusCode.OK).json({ HealthUser })
    } catch (err) {
        res.status(StatusCode.OK).json({ status: "Something Unexpected Happened" })
        console.log(err.message)

    }


}


const Update_PatientProblem = async (req, res) => {
    try {
        const { id } = req.params
        const Deleted = await PatientProblem_Schema.deleteMany({ health_id: id })
        console.log(id)
        res.status(200).json({ message: "Succesfully Deleted", deleteCount: Deleted })
        // res.send("Deleted")
    } catch (err) {
        res.status(404).json({ Message: err.message })
    }
}



module.exports = {
    Create_PatientProblem,
    Update_PatientProblem,
    GetPatient_Records
}