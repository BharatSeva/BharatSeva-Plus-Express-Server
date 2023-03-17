const express = require("express");
const { GetDetails, Get_Adetails } = require("../Controllers/Get_For_PatientDetails");
const router = express.Router();



router.route('/get').get(GetDetails)
router.route('/get/:id').get(Get_Adetails)



module.exports = router