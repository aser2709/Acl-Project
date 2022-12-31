const mongoose = require ('mongoose');
const Schema = mongoose.Schema;

const bcrypt = require('bcrypt')
const validator = require('validator')
const adminSchema = new Schema({
    Username: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true
    }});

    

    adminSchema.statics.signup = async function(Username,Password) {

      // validation
      if (!Username || !Password) {
        throw Error('All fields must be filled')
      }
      const usernameexists = await this.findOne({ Username })
      if (usernameexists) {
        throw Error('username already in use')
      }
    
      const salt = await bcrypt.genSalt(10)
      const hash = await bcrypt.hash(Password, salt)
    
      const admin = await this.create({Password: hash, Username})
    
      return admin
    }
    
    // static login method
    adminSchema.statics.login = async function(Username, Password) {
    
      if (!Username || !Password) {
        throw Error('All fields must be filled')
      }
    
      const admin = await this.findOne({ Username })
      if (!admin) {
        throw Error('Incorrect Username')
      }
    
      const match = await bcrypt.compare(Password, admin.Password)
      if (!match) {
        throw Error('Incorrect Password')
      }
    
      return admin
    }
    

module.exports = mongoose.model('Admin', adminSchema)