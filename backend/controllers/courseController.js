const Course = require('../models/courseModel')
const mongoose = require('mongoose')

//get all instructor courses
const getCourses = async (req, res) => {
    const user_id = req.user._id

    const courses = await Course.find({user_id}).sort({ createdAt: -1 })
    res.status(200).json(courses)
}
//get all courses
const getAllCourses = async (req, res) => {

    const courses = await Course.find({}).sort({ createdAt: -1 })
    res.status(200).json(courses)
}

//get a single course
const getCourse = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such course' })
    }
    const course = await Course.findById(id)

    if (!course) {
        return res.status(404).json({ error: 'No such course' })
    }

    res.status(200).json(course)
}

//create a new course
const createCourse = async (req, res) => {
        const { title, subtitle, price, short_summary, instructor, rating,subject,total_hours_course,video_preview } = req.body
    
        let emptyFields =[]
    
        if(!title){
            emptyFields.push('title')
        }
    
        if(!total_hours_course){
            emptyFields.push('length')
        }
    
        if(!instructor){
            emptyFields.push('instructor')
        }
        if(!short_summary){
            emptyFields.push('summary')
        }
    
        if(!subtitle){
            emptyFields.push('subtitles')
        }
    
        if(!rating){
            emptyFields.push('rating')
        }
        if(!subject){
            emptyFields.push('subject')
        }
    
    
       // if(emptyFields.length > 0){
          //  return res.status(400).json({error: 'Please fill in the empty fields.', emptyFields})
       // }
        
        try{
        const user_id = req.user._id
        const course = await
        Course.create({title, subtitle, price, short_summary, instructor, rating,subject,total_hours_course, user_id,video_preview})
        res.status(200).json(course)
        
        } catch (error){
            res.status(400).json({error: error.message} + "test")
        }
    }
    
    


//delete a course
const deleteCourse = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such course' })
    }

    const course = await Course.findByIdAndDelete({ _id: id })

    if (!course) {
        return res.status(404).json({ error: 'No such course' })
    }

    res.status(200).json(course)
}

//update a course
const updateCourse = async (req, res) => {
    const { id } = req.params

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such course' })
    }

    const course = await Course.findOneAndUpdate({ _id: id }, {
        ...req.body
    })

    if (!course) {
        return res.status(400).json({ error: 'No such course' })
    }

    res.status(200).json(course)
}
//Filter a course
const filterCourse = async (req, res) => {
    const course = await Course.find({ ...req.body }).sort({ createdAt: -1 })
    res.status(200).json(course)
}
const addRating = async(req,res) =>{
    const rating = req.body
    console.log(rating.rating)
    const { id } = req.params
      if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such course' })
    }
    const course = await Course.findById({ _id: id })
    if (rating.rating == '1'){
        course.rating = 1
        course.markModified('rating')
        course.save()
    }
    if (rating.rating == '2'){
        course.rating = 2
        course.markModified('rating')  
        course.save()
    }
    if (rating.rating == '3'){
        course.rating = 3
        course.markModified('rating')  
        course.save()
    }
    if (rating.rating == '4'){
        course.rating = 4
        course.markModified('rating')  
        course.save()
    }
    if (rating.rating == '5'){
        course.rating = 5
        course.markModified('rating')  
        course.save()
    }
    console.log(course.get( 'rating', null, {getters: false}))
    res.status(200).json(course.get('rating', null, {getters: false}))
}

const getRating = async (req,res) =>{
    const { id } = req.params
    const course = await Course.findById({ _id: id })

    return course.get('rating', null, {getters: false})
}





module.exports = {
    createCourse,
    getCourses,
    getCourse,
    deleteCourse,
    updateCourse,
    filterCourse,
    getAllCourses,
    addRating, 
    getRating
}