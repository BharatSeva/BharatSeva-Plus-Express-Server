const express = require("express");
const { Create_PatientProblem, Update_PatientProblem, GetPatient_Records } = require("../Controllers/HIP_Patient_Problem_Issuer")


const router = express.Router();



router.route("/getpatientrecords").get(GetPatient_Records)
router.route('/createpatientproblem').post(Create_PatientProblem)
// router.route('/UpdatePatient/:id').delete(Update_PatientProblem)



module.exports = router;