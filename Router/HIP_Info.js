const express = require('express')

const router = express.Router();

const { CreateDetails, GetDetails, updateDetails } = require("../Controllers/HIP_Info")


router.post("/putdata", CreateDetails);
router.get("/getdata", GetDetails);
router.patch('/patchdata/', updateDetails)





module.exports = router