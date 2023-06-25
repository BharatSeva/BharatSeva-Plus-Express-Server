const express = require("express");
const router = express.Router();

const { Get_details } = require("../Controllers/Get_For_PatientProblem_Details");

router.route('/records/:id').get(Get_details)

// From Firebase
const { HealthUser_ActivityData, GET_HealthUserSettings, UpdateHealthUserSetting } = require("../Firebase/Service")

router.get('/userstats', HealthUser_ActivityData)
router.get("/usertimesstats", GET_HealthUserSettings)
router.post("/user/settings/:healthId", UpdateHealthUserSetting)
module.exports = router