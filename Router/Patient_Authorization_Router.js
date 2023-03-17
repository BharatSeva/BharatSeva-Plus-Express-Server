const express = require("express");
const { Patient_Register, Patient_Login } = require("../Controllers/Patient_Authorization");

const router = express.Router();


router.post('/PatientRegister', Patient_Register)
router.post('/PatientLogin',Patient_Login)




module.exports = router