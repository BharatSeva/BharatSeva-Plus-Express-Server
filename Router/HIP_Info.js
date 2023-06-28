const express = require('express')

const router = express.Router();

const { CreateDetails, GetDetails, updateDetails, DeleteHealthCareAccount } = require("../Controllers/HIP_Info")


router.post("/create", CreateDetails);
router.get("/get/:HealthCareID", GetDetails);
router.patch('/patchdata/', updateDetails)

// Send DeleteHealthCare Account 
router.route("/healthcare/deleteaccount").delete(DeleteHealthCareAccount)


// From Firebase
const { GetAllData } = require("../Firebase/Service")

router.get('/stats/:HealthCareID', GetAllData)

module.exports = router