const express = require("express");
const { Create_PatientProblem, Update_PatientProblem } = require("../Controllers/Patient_Problem_Issuer");
const router = express.Router();




router.route('/createpatientproblem').post(Create_PatientProblem)
router.route('/UpdatePatient/:id').delete(Update_PatientProblem)



module.exports = router;