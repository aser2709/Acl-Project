const Course = require('../models/courseModel')
const Result = require('../models/resultModel')
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
   

    //console.log(course)
    res.status(200)
}

const getRating = async (req,res) =>{
    const { id } = req.params
    const course = await Course.findById({ _id: id })

    let items = Object.entries(course.get('rating', null, {getters: false})); // get an array of key/value pairs of the object like this [[1:1], [2:1]...]
    let sum = 0; // sum of weighted ratings
    let total = 0; // total number of ratings
    console.log(items)
    for(let [key,value] of items){
        console.log(value)
        if(Number.isInteger(value)){
            total += value;
            sum += value * parseInt(key);
            }  // multiply the total number of ratings by it's weight in this case which is the key
    }
     let final = Math.round((sum / total) * 10) / 10
    console.log(final)

    return final 
}

//Get Subtitles for a Course
const getSubtitles = async (req,res) =>{
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such Subtitle' })
    }
    const subtitle = await Course.find({_id:id},{
        subtitle:1,_id:0
    })
    if(subtitle==""){
        res.status(400).json({ error: 'No such Subtitle' })
    }else{
    res.status(200).json(subtitle[0])
    }
}

//Create Quiz for a Course
const addQuizCourse = async (req,res) =>{
    try {
        const {questions,answers} = req.body
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'No such course' })
        }
        const course = await Course.updateOne(
            {_id:id},
            {
                exercise: {questions,answers}

            },
            {upsert: true}
            );
        res.status(200).json(course)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Get Course Quiz
const getQuizCourse = async (req,res) =>{
    const {id} = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such course' })
    }
    try {
        const quiz = await Course.find({_id:id},{exercise:1,_id:0})
        if (quiz=="") {
            return res.status(404).json({ error: 'No such course' })
        }
        res.status(200).json(quiz)
        
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Create Quiz for a subtitle
const addQuizSubtitle = async (req,res) =>{
    try {
        const {id} = req.params
        const {questions,answers} = req.body
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'No such Subtitle' })
        }
        const subtitle = await Course.updateOne(
        {"subtitle._id":id},
            { $set: {"subtitle.$[elem].exercise": {questions,answers}}},
            {arrayFilters: [{"elem._id": {$eq: id}}]
        }
        );
    res.status(200).json(subtitle)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}

//Get Quiz for a subtitle
const getQuizSubtitle = async (req,res) =>{
    const { id } = req.params
    const name = req.headers.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such Subtitle' })
    }
    const subtitle = await Course.find({"subtitle._id":id},{
        subtitle:1,_id:0
    })
    if(subtitle==""){
        res.status(400).json({ error: 'No such Subtitle' })
    }else{
        const fill = subtitle[0].subtitle
        const filt = fill.filter(r => r.name === name )
        console.log(filt)
        if(filt==""){
            res.status(400).json({ error: 'No such Subtitle' })
        }else{
            res.status(200).json(filt[0].exercise)
        }
    }
}

//Create result for a quiz Course
const addResultCourse = async (req,res) =>{
    try {
        const { username , result,attempts,points,achived } = req.body;
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'No such course' })
        }
        if (!username && !result ) throw new Error("Data not Provided")
        const course = await Course.updateOne(
            {_id:id},
            {$push: {
                results: { username , result,attempts,points,achived }
                },
            },
            {upsert: true}
            );
        Result.create({ username , result,attempts,points,achived },function(err,data){
            res.json({mssg: "Result Saved Successfully"})
        })
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Create result for a quiz subtitle
const addResultSubtitle = async (req,res) => {
    try {
        const { username , result,attempts,points,achived } = req.body;
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'No such Subtitle' })
        }
        if (!username && !result ) throw new Error("Data not Provided")
        const subtitle = await Course.updateOne(
            {"subtitle._id":id},
                { $push: {"subtitle.$[elem].results": { username , result,attempts,points,achived }}},
                {arrayFilters: [{"elem._id": {$eq: id}}]
            }
            );
        res.status(400).json(subtitle)
    } catch (error) {
        
    }
}

//Get result for a quiz Course
const getResultCourse = async (req,res) => {
    try {
        const {id} = req.params
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ error: 'No such course' })
        }
        const r = await Course.find({_id:id},{results:1,_id:0})
        res.json(r)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//Get result for a quiz subtitle
const getResultSubtilte = async (req,res) => {
    const {id} = req.params
    const {name} = req.body
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'No such Subtitle' })
    }
    const subtitle = await Course.find({"subtitle._id":id},{
        subtitle:1,_id:0
    })
    if(subtitle==""){
        res.status(400).json({ error: 'No such Subtitle' })
    }else{
        const fill = subtitle[0].subtitle
        const filt = fill.filter(r => r.name === name )
        if(filt==""){
            res.status(400).json({ error: 'No such Subtitle' })
        }else{
            res.status(200).json(filt[0].results)
        }
    }
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
    getRating,
    addQuizCourse,
    addQuizSubtitle,
    getQuizCourse,
    getQuizSubtitle,
    addResultCourse,
    addResultSubtitle,
    getResultCourse,
    getResultSubtilte,
    getSubtitles,
    
}