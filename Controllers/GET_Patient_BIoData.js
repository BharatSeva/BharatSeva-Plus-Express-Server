const StatusCode = require('http-status-codes')

const GetData = require("../Schema/Patient_Info_Schema")

// This Will Give Patient Bio Data To Patient End Point
const GetBioData = async (req, res) => {
    try {
        const { healthId } = req.user;
        const BioData = await GetData.findOne({ health_id: healthId }).select(["-__v", "-_id"])
        res.status(StatusCode.OK).json({ BioData })
    } catch (error) {
        res.status(StatusCode.INTERNAL_SERVER_ERROR).json({ message: "Something Went Wrong!" })
        console.log(error.message)
    }
}






module.exports = {
    GetBioData
}
