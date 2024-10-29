const express = require("express");
const { Patient_Register, Patient_Login } = require("../Controllers/Patient_Authorization");
 
 
const router = express.Router();
 

router.post('/userregister', Patient_Register)
router.post('/userlogin', Patient_Login)




module.exports = router