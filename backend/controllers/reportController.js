const Report = require('../models/reportModel')
const mongoose = require('mongoose')

//get all user reports
const getUserReports = async (req, res) => {
    const user_email = req.headers.email
    console.log(user_email)
    //req.body

    const reports = await Report.find({user_email}).sort({ createdAt: -1 })
    res.status(200).json(reports)
}

//get all course reports
const getCourseReports = async (req, res) => {
    const course_id = req.course._id

    const reports = await Report.find({course_id}).sort({ createdAt: -1 })
    res.status(200).json(reports)
}


//get all reports
const getAllReports = async (req, res) => {

    const reports = await Report.find({}).sort({ createdAt: -1 })
    res.status(200).json(reports)
}


//create a new report
const createReport = async (req, res) => {

    const { Type, Body} = req.body
    console.log(Type)
    console.log(Body)
    

    let emptyFields =[]

    if(!Type){
        emptyFields.push('Type')
    }

    if(!Body){
        emptyFields.push('Body')
    }


    
    try{

    const user_email = req.body.userEmail
    const course_id = req.body.courseId
    const course_name = req.body.courseName

    console.log(course_id)
    console.log(req.body)
    const resolved = false
    console.log(user_email)

    const report = await

    Report.create({user_email,course_id,course_name,Type,Body,resolved})
    res.status(200).json(report)
    
    } catch (error){
        res.status(400).json({error: error.message} + "test")
    }
}



//delete a report
const deleteReport = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such Report' })
    }

    const report = await Report.findByIdAndDelete({ _id: id })

    if (!report) {
        return res.status(404).json({ error: 'No such Report' })
    }

    res.status(200).json(report)
}

//update a report
const updateReport = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such Report' })
    }

    const report = await Report.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!course) {
        return res.status(400).json({ error: 'No such Report' })
    }

    res.status(200).json(report)
}

module.exports = {
    createReport,
    getUserReports,
    getCourseReports,
    deleteReport,
    updateReport,
    getAllReports
}