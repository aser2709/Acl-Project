const express = require('express')
const router = express.Router()

const { logout, updateEmail, signupUser, loginUser, changePassword, forgotPassword, resetpassword, addRating, getRating, AddRegisteredCourse, getRegisteredCourses, getSingleCourseUser, getBiography, updateBiography, getSubtitle, getAllSubtitles } = require('../controllers/userController')

const requireAuth = require("../middleware/requireAuth");

//sign up
router.post('/signup', signupUser)

//login
router.post('/login', loginUser)

//logout
router.get('/logout', logout)

//forgot password
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword/:id",resetpassword);

router.post('/:id', addRating )
router.get('/:id', getRating )


//changePassword
router.patch('/change_password',changePassword)

//chaneEmail
router.patch('/change_email', updateEmail)

//getbioGraphy
router.get('/get_biography/bio', getBiography)

//chanebiography
router.patch('/change_biography', updateBiography)

//Add a registered course
router.patch('/registerCourse',AddRegisteredCourse);

//get All Courses a user registered for
router.get('/registeredCourse/all',getRegisteredCourses);
//get Single Course a user registered for
router.get('/courses/:id',getSingleCourseUser);


//Get subtitles for a registered course
router.get('/registeredCourse/subtitles/:id',getAllSubtitles)

//Get a single Subtitl for a registered course
router.get('/registeredCourse/subtitle/:id',getSubtitle)

module.exports = router