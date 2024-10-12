const express = require("express");
const { CreateBioData } = require("../Controllers/HIP_Patient_Info");
const router = express.Router();

// This Will Let To Create User Bio Data for healhCare Only
router.route('/createuserBio').post(CreateBioData)


// This Will Collect Data From HealthCareUser Device



// From Firebase
const { UpdateHealthCarePreferance, GetHealthCarePreferance } = require("../Firebase/Service")
router.route("/healthcare/changepreferance").post(UpdateHealthCarePreferance)
router.route("/healthcare/getpreferance").get(GetHealthCarePreferance)




module.exports = router; 