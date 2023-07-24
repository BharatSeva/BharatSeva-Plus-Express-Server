const express = require("express");
const { Patient_Register, Patient_Login, Patient_GoogleOAuth } = require("../Controllers/Patient_Authorization");


const router = express.Router();


router.post('/userregister', Patient_Register)
router.post('/userlogin', Patient_Login)
router.post('/googleOAuth', Patient_GoogleOAuth)




module.exports = router