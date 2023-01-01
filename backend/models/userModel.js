const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')


const Schema = mongoose.Schema

const questionSchema = new Schema ({
  id: {
      type: Number,
      unique: true
  },
  question: {
      type: String
  },
  options: {
      type: Array
  }
})
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
  ],
  exercise:{
    questions: [
        questionSchema
    ],
    answers: {
        type: Array,
        default: []
    }
}
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
    biography:{
      type: String,
      required: false,
      
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
    },rating:{
      type: mongoose.Mixed, // A mixed type object to handle ratings. Each star level is represented in the ratings object
      1: Number,           //  the key is the weight of that star level
      2: Number,
      3: Number,
      4: Number,
      5: Number,
      get: function(r){
          // r is the entire ratings object
          let items = Object.entries(r); // get an array of key/value pairs of the object like this [[1:1], [2:1]...]
          let sum = 0; // sum of weighted ratings
          let total = 0; // total number of ratings
          for(let [key,value] of items){
              if(Number.isInteger(value)){
              total += value;
              sum += value * parseInt(key);
              } // multiply the total number of ratings by it's weight in this case which is the key
          }
          return Math.round(sum / total)
      },
      set: function(r){
          if (!(this instanceof mongoose.Document)){
              // only call setter when updating the whole path with an object
              if(r instanceof Object) return r
              else{throw new Error('')}
          }else{
              // get the actual ratings object without using the getter which returns  an integer value
              // r is the ratings which is an integer value that represent the star level from 1 to 5
              if(r instanceof Object){
                  return r    // handle setting default when creating object
              }
              this.get('rating', null, {getters: false})[r] = 1 + parseInt(this.get('rating', null, {getters: false})[r])
              return this.get('rating', null, {getters: false})} // return the updated ratings object
      },
     /* validate:{
          validator: function(i){
              let b = [1, 2, 3, 4, 5] // valid star levels
              let v = Object.keys(i).sort()
              return b.every((x, j) => (v.length === b.length) && x === parseInt(v[j]))
          },
          message: "Invalid Star Level"
      },*/
      default: {1:1, 2:1, 3:1, 4:1, 5:1}
  },
  registeredCourses:[
    registeredCoursesSchema
  ] 
}, { timestamps: true }, {toObject:{getters: true, }, toJSON:{getters: true}})

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