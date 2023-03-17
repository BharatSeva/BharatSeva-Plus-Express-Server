const GetPatientDetails = require("../Schema/Patient_Info_Schema")
const StatusCode = require("http-status-codes")

// Get All the details of Patient
const Patient_problem_Schema = require("../Schema/Patient_problem_Schema");


const GetDetails = async (req, res) => {
    try {
        const { health_id } = req.body
        const details = await Patient_problem_Schema.find({ health_id }).select(["-__v","-_id"])

        if (!details) {
            res.status(StatusCode.BAD_REQUEST).json({ message: "No Details Is Created Uptill Now" })
            return;
        }

        res.status(StatusCode.OK).json({ details })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}



const Get_Adetails = async (req, res) => {
    try {
        const { id: health_id } = req.params
        const details = await Patient_problem_Schema.find({ health_id })

        if (!details) {
            res.status(StatusCode.BAD_REQUEST).json({ message: "No Details Is Created Uptill Now" })
            return;
        }

        res.status(StatusCode.OK).json({ details })
    }
    catch (err) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: err.message })
    }
}


module.exports = { GetDetails, Get_Adetails }