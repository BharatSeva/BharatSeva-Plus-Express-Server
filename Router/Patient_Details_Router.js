const express = require("express");
const { Get_details } = require("../Controllers/Get_For_PatientProblem_Details");
const router = express.Router();
router.route('/records/:id').get(Get_details)
module.exports = router