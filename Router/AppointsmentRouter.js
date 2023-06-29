const express = require("express")

const {
    GetAppointment_User,
    CreateAppointment
} = require("../Controllers/AppointmentController")

const router = express.Router()

router.post('/:healthcareID/createappointment', CreateAppointment)
router.get('/appointment/:health_ID/', GetAppointment_User)



module.exports = router