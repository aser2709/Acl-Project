const express = require('express')
const router = express.Router()

const { logout, signupUser, loginUser, changePassword } = require('../controllers/userController')


//sign up
router.post('/signup', signupUser)

//login
router.post('/login', loginUser)

//logout
router.get('/logout', logout)

//changePassword
router.patch('/change_password',changePassword)

module.exports = router