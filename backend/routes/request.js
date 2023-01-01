const express = require('express')
const router = express.Router()
const { adminrequest} = require('../controllers/requestController')
const { grantaccess } = require('../controllers/requestController')
const { getAllRequests } = require('../controllers/requestController')
router.post('/request', adminrequest)
router.patch('/:id',grantaccess)
router.get('/allRequests',getAllRequests)
module.exports = router;
