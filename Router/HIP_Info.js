const express = require('express')

const router = express.Router();

const { GetDetails, updateDetails, DeleteHealthCareAccount, HealthcareAppointment } = require("../Controllers/HIP_Info")
router.get("/getdetails", GetDetails);
router.patch('/patchdata', updateDetails)

// Send DeleteHealthCare Account 
router.route("/healthcare/deleteaccount").delete(DeleteHealthCareAccount)


// Below are for Healthcare Appointment Section
router.get("/healthcare/appointment", HealthcareAppointment)



// From Firebase
const { GetAllData } = require("../Firebase/Service")

router.get('/stats', GetAllData)

module.exports = router