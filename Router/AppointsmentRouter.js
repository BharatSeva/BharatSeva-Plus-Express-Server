const express = require("express")

const {
    GetAppointment_User,
    GetAppointment_HealthCare
} = require("../Controllers/AppointmentController")

const router = express.Router()

router.get('/appointment/:health_ID/', GetAppointment_User)
router.get('/hip/appointment/:healthcareID/', GetAppointment_HealthCare)



module.exports = router