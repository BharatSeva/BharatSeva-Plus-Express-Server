const express = require("express");
const { Get_allDetails, Get_Adetails, CreateDetails, UpdateDetails, deleteDetails } = require("../Controllers/HIP_Patient_Info");

const router = express.Router();


router.route('/createpatientbiodata').get(Get_allDetails).post(CreateDetails)
router.route('/:id').get(Get_Adetails).delete(UpdateDetails).patch(deleteDetails);





// From Firebase
const { UpdateHealthCarePreferance, GetHealthCarePreferance } = require("../Firebase/Service")
router.route("/healthcare/changepreferance").post(UpdateHealthCarePreferance)
router.route("/healthcare/getpreferance").get(GetHealthCarePreferance)




module.exports = router; 