const express = require('express')
const router = express.Router()
const { adminrequest} = require('../controllers/requestController')
router.post('/request', adminrequest)
module.exports = router;
