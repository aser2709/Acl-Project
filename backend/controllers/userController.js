const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

// login a user
const loginUser = async (req, res) => {
  const { email, password } = req.body

  try {
    const user = await User.login(email, password)

    // create a token
    const token = createToken(user._id)
    const user_ = await User.findOne({email:email},{userType:1, firstName:1,lastName:1,_id:0})
    res.status(200).json({email,token,user_})
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}

// signup a user
const signupUser = async (req, res) => {
  const { email, password, firstName, lastName, username, userType } = req.body

  try {
    const user = await User.signup(email, password, firstName, lastName, username, userType)

    // create a token
    const token = createToken(user._id)

    const user_ = await User.findOne({email:email},{userType:1, firstName:1,lastName:1,_id:0})
    res.status(200).json({email,token,user_})
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
}
const logout = async (req, res) => {

  res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
  res.status(200).json({ mssg: "Logged Out Successfully" });
}

//change password
const changePassword = async (req, res) => {
  const { email, oldPassword, newPassword } = req.body
  const user = await User.findOne({ email: email })
  const match = await bcrypt.compare(oldPassword, user.password)
  if (!match) {
   res.status(400).json({error: 'Incorrect Password'})
  } else {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(newPassword, salt)
    const userUpdate = await User.findOneAndUpdate({ email: email }, { password: hash })
    res.status(200).json({ mssg: "Password changed Successfully" })
  }
}

module.exports = { signupUser, loginUser, logout, changePassword }