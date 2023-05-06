const express = require("express");
const { GetDetails, Get_Adetails } = require("../Controllers/Get_For_PatientProblem_Details");
const router = express.Router();



router.route('/get').get(GetDetails)
router.route('/patientgetdata/:id').get(Get_Adetails)



module.exports = router