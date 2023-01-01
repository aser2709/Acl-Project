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
    getRating,
    addQuizCourse,
    addQuizSubtitle,
    getQuizCourse,
    getQuizSubtitle,
    addResultCourse,
    addResultSubtitle,
    getResultCourse,
    getResultSubtilte,
    getSubtitles
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

//Add Rating
router.post('/:id', addRating )
//Get Rating
router.get('/:id', getRating )

//Post Quiz for Course
router.post('/coursequiz/:id',addQuizCourse)

//Post Quiz for subtitle
router.post('/subtitlequiz/:id',addQuizSubtitle)

//Get Quiz for Course
router.get('/coursequiz/:id',getQuizCourse)

//Get Quiz for subtitle
router.get('/subtitlequiz/:id',getQuizSubtitle)

//Post Result for course
router.post('/courseresult/:id',addResultCourse)
//Post Result for subtitle
router.post('/subtitleresult/:id',addResultSubtitle)
//Get Result for course
router.get('/courseresult/:id',getResultCourse)
//Get Result for subtitle
router.get('/subtitleresult/:id',getResultSubtilte)

//Get Subtitles for a course
router.get('/subtitles/:id',getSubtitles)


module.exports = router