const express = require("express");

const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const router = express.Router();
const adminmodel = require('../models/adminModel')

const createTokenforgot = require("../helpers/createTokenforgot");


const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' })
}

router.post("/admin/signup", async (req,res) =>{
    const { Username,Password} = req.body

  try {
    const admin = await adminmodel.signup(Username,Password)

    // create a token
    const token = createToken(admin._id)
    res.status(200).json({Username,token})
  } catch (error) {
    res.status(400).json({ error: error.message })}
});
router.post("/admin/login", async (req,res) => {
    const { Username, Password } = req.body
  
    try {
      const admin = await adminmodel.login(Username, Password)
  
      // create a token
      const token = createToken(admin._id)
      res.status(200).json({Username,token})
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
});
router.get("/admin/logout", async (req,res) => {

    res.cookie('jwt', '', { httpOnly: true, maxAge: 1 });
    res.status(200).json({ mssg: "Logged Out Successfully" });
  });
  

module.exports = router;