const express = require("express")
const router = express.Router();
const { Update_Records, GetAllData, Update_No_Of_Views, RecordsCreated, RecordsViewed, HealthID_Created, BioDV } = require("../Firebase/Service")



router.post('/firebase/chpre', Update_Records)
router.get('/firebase/GET', GetAllData)
router.get('/firebase/BioDV', BioDV)
router.get('/firebase/RecordsCreated', RecordsCreated)
router.get('/firebase/RecordsViewed', RecordsViewed)
router.get('/firebase/HealthID_Created', HealthID_Created)

module.exports = router