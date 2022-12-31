const express = require('express')
const router = express.Router()
const {
    createReport,
    getUserReports,
    getCourseReports,
    deleteReport,
    updateReport,
    getAllReports
} = require('../controllers/reportController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//Get all user Reports
router.get('/yourReports', getUserReports)



// POST a new Report
router.post('/createReport', createReport)


// UPDATE a Report
router.patch('/:courseId',updateReport)


module.exports = router