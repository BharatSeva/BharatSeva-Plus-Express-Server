const StatusCode = require('http-status-codes')

const GetData = require("../Schema/Patient_Info_Schema")

const GetBioData = async (req, res) => {
    try { 
        const { health_id } = req.params;
        const BioData = await GetData.findOne({ health_id }).select(["-__v", "-_id"])
        res.status(StatusCode.OK).json({ Data: BioData })
    } catch (error) {
        console.log(error.message)
    }
} 

 




module.exports = {
    GetBioData
}
