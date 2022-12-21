const mongoose = require('mongoose')

const Schema = mongoose.Schema

const youtubeLinkScehma = new Schema({
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
    name:{
        type:String,
        required: true
    },
    youtube:[
        youtubeLinkScehma
    ]
})
const courseSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    subtitle:[
        subtitleSchema,
    ],
    price: {
        type: Number,
        required: true
    },
    short_summary: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    rating:{
        type:Number,
        required: true
    },
    subject:{
            type: String,
            required: true
        },
    total_hours_course:{
            type: Number,
            required: true
        },
    user_id: {
            type: String,
            required: true
          },
    video_preview:{
        type: String,
        required: true
    }
}, { timestamps: true })

module.exports = mongoose.model('Course', courseSchema)
