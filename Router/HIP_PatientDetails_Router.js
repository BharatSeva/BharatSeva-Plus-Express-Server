const express = require("express");
const { Get_allDetails, Get_Adetails, CreateDetails, UpdateDetails, deleteDetails } = require("../Controllers/HIP_Patient_Info");

const router = express.Router();


router.route('/createpatientbiodata').get(Get_allDetails).post(CreateDetails)
router.route('/:id').get(Get_Adetails).delete(UpdateDetails).patch(deleteDetails);



module.exports = router; 