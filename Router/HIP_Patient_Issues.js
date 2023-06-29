const express = require("express");
const { Create_PatientProblem, GetPatient_Records } = require("../Controllers/HIP_Patient_Problem_Issuer")
const { Get_UserBioData } = require("../Controllers/HIP_Patient_Info")

const router = express.Router();
// This Will Fetch User Bio Data For HealthCare Only
router.route("/getuserBiodata/:health_id").get(Get_UserBioData)

router.route("/getpatientrecords").get(GetPatient_Records)
router.route('/createpatientproblem').post(Create_PatientProblem)



module.exports = router;