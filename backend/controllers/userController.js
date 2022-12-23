const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const sendMail = require("../helpers/sendMail");
const createTokenforgot = require("../helpers/createTokenforgot");


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

    

    res.status(200).json({ email, token })
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

    res.status(200).json({ email, token })
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

const forgotPassword = async (req,res) => {
  try {
    // get email
    const { email } = req.body;

    // check email
    const user = await User.findOne({ email });
    if (!user)
      return res
        .status(400)
        .json({ msg: "This email is not registered in our system." });

    // create ac token
    const ac_token = createTokenforgot.access({ id: user.id });

    // send email
    const url = `http://localhost:3000/user/reset-password/${ac_token}`;
    const name = user.name;
    sendMail.sendEmailReset(email, url, "Reset your password", name);

    // success
    res
      .status(200)
      .json({ msg: "Re-send the password, please check your email." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
}

const resetpassword = async (req,res) => {
  try {
    // get password
    const { password } = req.body;

    // hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // update password
    await User.findOneAndUpdate(
      { _id: req.user.id },
      { password: hashPassword }
    );

    // reset success
    res.status(200).json({ msg: "Password was updated successfully." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }

}

module.exports = { signupUser, loginUser, logout, changePassword, forgotPassword, resetpassword }