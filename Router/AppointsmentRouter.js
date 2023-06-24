const express = require("express")

const { CreateAppointment,
    GetAppointment_User,
    GetAppointment_HealthCare
} = require("../Controllers/AppointmentController")

const router = express.Router()

router.post('/:healthcareID/appointment/:health_ID', CreateAppointment)
router.get('/appointment/:health_ID/', GetAppointment_User)
router.get('/hip/appointment/:healthcareID/', GetAppointment_HealthCare)


module.exports = router