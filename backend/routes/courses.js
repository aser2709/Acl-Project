const express = require('express')
const router = express.Router()
const {
    createCourse,
    getCourses,
    getCourse,
    updateCourse,
    deleteCourse,
    filterCourse,
    getAllCourses,
    addRating,
    getRating
} = require('../controllers/courseController')
const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

//Get all instructor Courses
router.get('/', getCourses, getRating)

//Get all Courses
router.get('/courses',getAllCourses, getRating)

// GET a single Course
router.get('/:id', getCourse , getRating)

// POST a new Course
router.post('/', createCourse)

// DELETE a Course
router.delete('/:id',deleteCourse)

// UPDATE a Course
router.patch('/:id',updateCourse)

// Filter a Course
router.get('/coursefilter/',filterCourse)

router.post('/:id', addRating )
router.get('/:id', getRating )

module.exports = router