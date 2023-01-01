const User = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const sendMail = require("../helpers/sendMail");
const createTokenforgot = require("../helpers/createTokenforgot");
const mongoose = require('mongoose')


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
//update email
const updateEmail = async (req, res) => {
 
  const { email, newEmail} = req.body
  
  const user = await User.findOneAndUpdate({email: email},{email: newEmail})
  
  res.status(200).json(user)
}

//Biography
const getBiography = async (req, res) => {
  
  const email = req.headers.body
  
  const user = await User.find({email: email},{biography: 1})

  res.status(200).json(user)
}
const updateBiography = async (req, res) => {
 
  const { email, biography} = req.body
  
  const user = await User.findOneAndUpdate({email: email},{biography: biography})
  
  res.status(200).json(user)
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
    const url = `http://localhost:3000/resetpassword/${user._id}`;
    const name = user.firstName;
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
    const {id} = req.params

    // hash password
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);

    // update password
    const userUpdate = await User.findOneAndUpdate({ _id: id }, { password: hashPassword })

    // reset success
    res.status(200).json({ msg: "Password was updated successfully." });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }

}

//Add registered course
const AddRegisteredCourse = async (req,res) => {
  const course = req.body
  try{
  const user_email = course.email
  if(user_email){
  const addedCourse = await User.updateOne(
    {email: user_email},
    {$push: {
      registeredCourses: course.xCourse,
    },
  },
  {upsert: true}
  );
  res.status(200).json(addedCourse)
  }
  }catch(error){
    res.status(400).json({error:error.message})
    console.log("Im here")
  }
}
//get All registered Courses for a user
const getRegisteredCourses = async (req,res) =>{
  const email = req.headers.body
  try{
    const yourCourses = await User.findOne({email:email},{registeredCourses:1,_id:0})
    res.status(200).json(yourCourses)
  } catch(error){
    res.status(400).json({error: error.message})
  }
}
//get a registered Course for a user
const getSingleCourseUser = async (req,res) => {
  const { id } = req.params
  try{
  const yourCourse = await User.findOne({"registeredCourses._id": id},{registeredCourses:1,_id:0})
  res.status(200).json(yourCourse)
  } catch(error){
    res.status(400).json({error: error.message})
  }
}
const addRating = async(req,res) =>{
  const rating = req.body
  console.log(rating.rating)
  const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ error: 'No such instructor' })
  }
  const instructor = await Course.findById({ _id: id })

  if (rating.rating == '1'){
      instructor.rating = 1
      instructor.markModified('rating')
      instructor.save()
  }
  if (rating.rating == '2'){
      instructor.rating = 2
      instructor.markModified('rating')  
      instructor.save()
  }
  if (rating.rating == '3'){
      instructor.rating = 3
      instructor.markModified('rating')  
      instructor.save()
  }
  if (rating.rating == '4'){
      instructor.rating = 4
      instructor.markModified('rating')  
      instructor.save()
  }
  if (rating.rating == '5'){
      instructor.rating = 5
      instructor.markModified('rating')  
      instructor.save()
  }


  //console.log(instructor)
  res.status(200)
}

const getRating = async (req,res) =>{
  const { id } = req.params
  const instructor = await User.findById({ _id: id })

  let items = Object.entries(instructor.get('rating', null, {getters: false})); // get an array of key/value pairs of the object like this [[1:1], [2:1]...]
  let sum = 0; // sum of weighted ratings
  let total = 0; // total number of ratings
 
  for(let [key,value] of items){
     
      if(Number.isInteger(value)){
          total += value;
          sum += value * parseInt(key);
          }  // multiply the total number of ratings by it's weight in this case which is the key
  }
   let final = Math.round((sum / total) * 10) / 10
 

 return res.status(200).json(final) 
}


module.exports = { signupUser,getBiography,updateBiography, updateEmail, loginUser, logout, changePassword, forgotPassword, resetpassword,AddRegisteredCourse,getRegisteredCourses,getSingleCourseUser,getRating,addRating }
