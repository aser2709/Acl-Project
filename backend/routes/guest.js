const express = require('express')
const router = express.Router()
const {
    getCourses,
    getCourse,
    getAllCourses,
} = require('../controllers/courseController')





//Get all Courses
router.get('/',getAllCourses)



module.exports = router