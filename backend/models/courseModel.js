const mongoose = require('mongoose')

const Schema = mongoose.Schema

const courseSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    subtitle: {
        type: String
    },
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
    },
    subject:{
            type: String,
            required: true
        },
    total_hours_course:{
            type: Number,
            required: true
        }
}, { timestamps: true })

module.exports = mongoose.model('Course', courseSchema)
