const express = require('express')
const router = express.Router()

const { logout, signupUser, loginUser } = require('../controllers/userController')


//sign up
router.post('/signup', signupUser)

//login
router.post('/login', loginUser)

//logout
router.get('/logout', logout)


module.exports = router