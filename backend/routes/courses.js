const express = require('express')
const router = express.Router()
const {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    filterCourse,
    getAllCourses
} = require('../controllers/courseController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//Get all instructor Courses
router.get('/', getCourses)

//Get all Courses
router.get('/courses',getAllCourses)

// GET a single Course
router.get('/:id', getCourse)

// POST a new Course
router.post('/', createCourse)

// DELETE a Course
router.delete('/:id',deleteCourse)

// UPDATE a Course
router.patch('/:id',updateCourse)

// Filter a Course
router.get('/coursefilter/',filterCourse)

module.exports = router