const GetPatientDetails = require("../Schema/Patient_Info_Schema")
const StatusCode = require("http-status-codes")

// Get All the details of Patient
const Patient_problem_Schema = require("../Schema/Patient_problem_Schema")

const Get_details = async (req, res) => {
    try {
        const { id: health_id } = req.params
        const records = await Patient_problem_Schema.find({ health_id }).select(["-__v", "-_id"]).sort("-Created_At")
        res.status(StatusCode.OK).json({ records, records_length: records.length })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}


module.exports = { Get_details }