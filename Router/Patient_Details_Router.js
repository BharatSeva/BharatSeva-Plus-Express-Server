const express = require("express");
const router = express.Router();

const { Get_details } = require("../Controllers/Get_For_PatientProblem_Details");

router.route('/records').get(Get_details)

// From Firebase
const { accountactivitylog, GetHealthUserStats, UpdateHealthUserPreferances, GetHealthUserPreferances } = require("../Firebase/Service")

// This Will Get HealthUser Preferances!
router.get('/preferances', GetHealthUserPreferances)
// This Will update User Preferances
router.post("/preferances", UpdateHealthUserPreferances)




router.get('/accountactivitylog', accountactivitylog)
router.get("/stats", GetHealthUserStats)
module.exports = router