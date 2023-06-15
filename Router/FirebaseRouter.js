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
    Get_HealthCare_Names
} = require("../Firebase/Service")



router.post('/firebase/chpre', Update_Records)
router.get('/firebase/GET', GetAllData)
router.get('/firebase/BioDV', BioDV)
router.get('/firebase/RecordsCreated', RecordsCreated)
router.get('/firebase/RecordsViewed', RecordsViewed)
router.get('/firebase/HealthID_Created', HealthID_Created)


router.post("/Firebase/putHealthCare", HealthUser)
router.get("/Firebase/GET_HealthUser/:id", GET_HealthUser)

router.get('/Firebase/gethealthcare/:id', Get_HealthCare_Names)

module.exports = router 