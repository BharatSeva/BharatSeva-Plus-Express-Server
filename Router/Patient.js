const express = require("express")
const router = express.Router()


// From Firebase Database
const { GetHealthCareForApp, Get_HealthCare_Names } = require("../Firebase/Service")


router.get('/gethealthcare/:healthcareId', GetHealthCareForApp)
router.get('/gethealthcarename', Get_HealthCare_Names)




module.exports = router