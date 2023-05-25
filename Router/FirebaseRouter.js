const express = require("express")
const router = express.Router();
const { Update_Records, GetAllData } = require("../Firebase/Service")



router.post('/firebase/chpre', Update_Records)
router.get('/firebase/GET', GetAllData)


module.exports = router