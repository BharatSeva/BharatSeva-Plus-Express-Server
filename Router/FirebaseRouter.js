const express = require("express")
const router = express.Router();
const { Update_Records,
    GetAllData,
    Update_No_Of_Views,
    RecordsCreated,
    RecordsViewed,
    HealthID_Created,
    BioDV,
    HealthUser,
    GET_HealthUser,
    Get_HealthCare_Names,
    HealthUser_Activity,
    HealthUser_ActivityData,
    SetAppointment,
    GetHealthCareForApp
} = require("../Firebase/Service")



// router.post('/firebase/chpre', Update_Records)
// router.get('/firebase/GET', GetAllData)
// router.get('/firebase/BioDV', BioDV)
// router.get('/firebase/RecordsCreated', RecordsCreated)
// router.get('/firebase/RecordsViewed', RecordsViewed)
// router.get('/firebase/HealthID_Created', HealthID_Created)


router.post("/Firebase/putHealthCare", HealthUser)
router.get("/Firebase/GET_HealthUser/:id", GET_HealthUser)

router.get('/Firebase/gethealthcare', Get_HealthCare_Names)

router.post('/Firebase/getUser/:id', HealthUser_Activity)
router.get('/Firebase/getUserActivityData/:id', HealthUser_ActivityData)

// This Will  Set Appointment of User
router.post('/:healthCareId/appointment/:appointmentId/', SetAppointment)

// This Will Get HealthCare Data For Appointment
router.get('/appointment/:healthcareId', GetHealthCareForApp)




module.exports = router 