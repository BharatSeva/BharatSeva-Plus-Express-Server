const express = require('express');
const router = express.Router();

const { GetBioData } = require('../Controllers/GET_Patient_BIoData');






router.route('/user/:health_id').get(GetBioData)


module.exports = router
