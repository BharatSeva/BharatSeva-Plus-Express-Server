const StatusCode = require("http-status-codes")
const PatientProblem_Schema = require("../Schema/Patient_problem_Schema")



const Create_PatientProblem = async (req, res) => {
    try {
        const { health_id } = req.body
        if (!health_id) {
            res.status(StatusCode.BAD_GATEWAY).json({ message: "Patient ID is not Provided" })
            return
        }
        const info = await PatientProblem_Schema.create(req.body)
        res.status(StatusCode.CREATED).json({ info })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}



const Update_PatientProblem = async (req, res) => {
    await PatientProblem_Schema.deleteMany({})
    res.status(StatusCode.OK).json({ message: "Succesfully Deleted" })
    // res.send("Deleted")
}



module.exports = {
    Create_PatientProblem,
    Update_PatientProblem
}