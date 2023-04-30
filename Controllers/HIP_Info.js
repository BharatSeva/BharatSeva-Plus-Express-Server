const HIP_info = require("../Schema/HIP_Info_Schema")
const statusCode = require("http-status-codes")


const CreateDetails = async (req, res) => {
    try {
        const create = await HIP_info.create(req.body)
        res.status(statusCode.OK).json({ Status: "Success" });
    }
    catch (err) {
        res.status(statusCode.BAD_REQUEST).json({ Status: "Failed", Messsage: err.message })
    }
}


const GetDetails = async (req, res) => {
    try {
        const { HIP_ID } = req.body;
        console.log(req.ip)
        const Find = await HIP_info.findOne({ HIP_ID }).select(['-__v', '-_id'])
        res.status(statusCode.OK).json({ Status: "Success", data: Find });
    }
    catch (err) {
        res.status(statusCode.BAD_REQUEST).json({ message: err.message })
    }
}


const updateDetails = async (req, res) => {

    try {
        const Update = await HIP_info.findOneAndUpdate({ HIPID: req.body.HIPID }, req.body, {
            new: true, runValidators: true
        })
        if (!Update) {
            res.status(statusCode.NOT_FOUND).json({ Message: `No HIP is found with ${req.body.HIPID}` })
            return;
        }
        res.status(statusCode.OK).json({ Status: "Success", details: Update })
    } catch (err) {
        res.status(statusCode.BAD_REQUEST).json({ message: err.message })
    }
}

module.exports = {
    CreateDetails,
    GetDetails,
    updateDetails
}

