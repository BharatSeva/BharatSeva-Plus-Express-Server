const StatusCode = require("http-status-codes")
const PatientProblem_Schema = require("../Schema/Patient_problem_Schema")
const Patient_Info = require("../Schema/Patient_Info_Schema")


const Create_PatientProblem = async (req, res) => {
    try {
        const { health_id } = req.body
        const FindPatient = await Patient_Info.findOne({ health_id })
        if (!FindPatient || !health_id) {
            res.status(StatusCode.BAD_REQUEST).json({ message: `No Patient Exist With ${health_id}` })
            return;
        }
        const info = await PatientProblem_Schema.create(req.body)
        res.status(StatusCode.CREATED).json({ message:"Successfully Created!", status:"Success" })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}



const Update_PatientProblem = async(req, res) => {
    try {
        const { id } = req.params
        const Deleted = await PatientProblem_Schema.deleteMany({health_id: id})
        console.log(id)
        res.status(200).json({ message: "Succesfully Deleted", deleteCount: Deleted })
        // res.send("Deleted")
    } catch (err) {
        res.status(404).json({ Message: err.message })
    }
}



module.exports = {
    Create_PatientProblem,
    Update_PatientProblem
}