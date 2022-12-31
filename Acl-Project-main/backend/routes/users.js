const express = require('express')
const router = express.Router()

const { logout, signupUser, loginUser, changePassword, forgotPassword, resetpassword, addRating, getRating, AddRegisteredCourse, getRegisteredCourses, getSingleCourseUser } = require('../controllers/userController')

const requireAuth = require("../middleware/requireAuth");

//sign up
router.post('/signup', signupUser)

//login
router.post('/login', loginUser)

//logout
router.get('/logout', logout)

//forgot password
router.post("/forgotpassword", forgotPassword);
router.post("/resetpassword", requireAuth, resetpassword);

router.post('/:id', addRating )
router.get('/:id', getRating )


//changePassword
router.patch('/change_password',changePassword)

//Add a registered course
router.patch('/registerCourse',AddRegisteredCourse);

//get All Courses a user registered for
router.get('/registeredCourse/all',getRegisteredCourses);
//get Single Course a user registered for
router.get('/courses/:id',getSingleCourseUser);

module.exports = router