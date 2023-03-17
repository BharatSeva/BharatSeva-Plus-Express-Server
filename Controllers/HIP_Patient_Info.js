const Jobs = require("../Schema/Patient_Info_Schema")
const StatusCode = require("http-status-codes")




const Get_allDetails = async (req, res) => {
    const patient = await Jobs.find({ createdBy: req.user.userID }).sort('createdAt')
    res.status(StatusCode.ACCEPTED).json({ patient, count: patient.length })
}

const Get_Adetails = async (req, res) => {
    try {
        const patientDetail = await Jobs.findOne({ health_id: req.params.id, createdBy: req.user.userID })
        res.status(StatusCode.OK).json({ patientDetail })
    } catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.messsage })
    }
}

const CreateDetails = async (req, res) => {
    try {
        req.body.createdBy = req.user.userID
        const patient = await Jobs.create(req.body)
        res.status(StatusCode.CREATED).json({ patient })
    }
    catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message })
    }
}

const UpdateDetails = async (req, res) => {
    try {
        const patient = await Jobs.findOneAndUpdate({ health_id: req.params.id }, req.body, {
            new: true, runValidators: true
        })
        if (!patient) {
            res.status(StatusCode.NOT_FOUND).json({ message: `Detail Not Found with Health_ID ${req.params.id}` })
            return;
        }
        res.status(StatusCode.OK).json({ patient })
    } catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message })
    }
}

const deleteDetails = async (req, res) => {
    try {
        const { params: { id: health_id } } = req
        const details = await Jobs.findOneAndDelete({ health_id: req.params.id }, req.body, {
            new: true, runValidators: true
        })
        if(!details){
            res.status(StatusCode.NOT_FOUND).json({message:"Details Not Found"})
            return;
        }
        res.status(StatusCode.OK).json({message:"Details Deleted"})
    } catch (err) {
        res.status(StatusCode.BAD_REQUEST).json({ message: err.message })
    }
}

module.exports = {
    Get_allDetails,
    Get_Adetails,
    CreateDetails,
    UpdateDetails,
    deleteDetails
}