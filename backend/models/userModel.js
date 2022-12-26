const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

const youtubeLinkScehma = new Schema({
  _id:{
    type: String
  },
  youtubelink:{
      type:String,
      required: true
  },
  short_description:{
      type:String,
      required: true
  }
})
const subtitleSchema = new Schema({
  _id:{
    type: String
  },
  name:{
      type:String,
      required: true
  },
  youtube:[
      youtubeLinkScehma
  ]
})
const registeredCoursesSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  subtitle:[
    subtitleSchema,
  ],
  short_summary: {
    type: String,
    required: true
  },
  _id:{
    type: String
  }
})
const userSchema = new Schema({

    email :{
        type: String,
        required: true,
        unique: true
    },
    password:{
    type: String,
    required: true
    },
    firstName:{
    type: String,
    required: true
    },
    lastName:{
    type: String,
    required: true
    },
    username:{
        type: String,
        required: true
    },
    userType:{
        type : String,
        required: true
    },
    registeredCourses:[
      registeredCoursesSchema,
    ]    
}, { timestamps: true })

userSchema.statics.signup = async function(email, password, firstName,lastName,username,userType) {

    // validation
    if (!email || !password) {
      throw Error('All fields must be filled')
    }
    if (!validator.isEmail(email)) {
      throw Error('Email not valid')
    }
    
  
    const exists = await this.findOne({ email })
    const usernameexists = await this.findOne({ username })
  
    if (exists) {
      throw Error('Email already in use')
    }
    if (usernameexists) {
      throw Error('username already in use')
    }
  
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)
  
    const user = await this.create({ email, password: hash ,firstName,lastName,username,userType})
  
    return user
  }
  
  // static login method
  userSchema.statics.login = async function(email, password) {
  
    if (!email || !password) {
      throw Error('All fields must be filled')
    }
  
    const user = await this.findOne({ email })
    if (!user) {
      throw Error('Incorrect email')
    }
  
    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      throw Error('Incorrect password')
    }
  
    return user
  }
  
 

module.exports = mongoose.model('User', userSchema)