const Adminrequest = require('../models/requestModel')
const mongoose = require('mongoose')




const adminrequest = async (req,res) => {
    const course = req.body
    const email = course.email
    const requestcourse = course.xCourse
    const type = 'Request Access'
    try{
      const create = await
      Adminrequest.create(course)
      res.status(200).json(create)
    }catch(error){
      res.status(400).json({error:error.message})
      console.log("Im here")
    }
  }
  module.exports = {adminrequest}