const express = require('express')
const router = express.Router()
const {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    filterCourse
} = require('../controllers/courseController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//Get all Courses
router.get('/', getCourses)

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