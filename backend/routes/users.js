const express = require('express')
const router = express.Router()

const { signUp, login, logout } = require('../controllers/userController')


//sign up
router.post('/', signUp)

//login
router.post('/login', login)

//logout
router.get('/logout', logout)


module.exports = router