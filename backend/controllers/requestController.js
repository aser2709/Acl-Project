const Adminrequest = require('../models/requestModel')
const mongoose = require('mongoose')




const adminrequest = async (req,res) => {
    const {course_id,Email,course_name}= req.body
    const Request = false
    try{
      const create = await
      Adminrequest.create({course_name,Email,course_id,Request})
      res.status(200).json(create)
    }catch(error){
      res.status(400).json({error:error.message})
      console.log("Im here")
    }
  }
  const getAllRequests = async (req, res) => {

    const requests = await Adminrequest.find({}).sort({ createdAt: -1 })
    res.status(200).json(requests)
}
  const grantaccess = async (req, res) => {
    const { id } = req.params
    const course = req.body
    
    console.log(req.body)
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such Request' })
    }

    const request = await Adminrequest.findOneAndUpdate({ _id: id }, {
        ...req.body
    })
    console.log(id)

    if (!request) {
        return res.status(400).json({ error: 'No such Request' })
    }

    res.status(200).json(request)}

  module.exports = {adminrequest,grantaccess,getAllRequests}