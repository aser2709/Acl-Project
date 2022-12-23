const express = require('express')
const router = express.Router()

const { logout, signupUser, loginUser, changePassword, forgotPassword, resetpassword } = require('../controllers/userController')

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


//changePassword
router.patch('/change_password',changePassword)

module.exports = router