const mongoose = require('mongoose')

const Schema = mongoose.Schema


const resultSchema = new Schema({
    username: {
        type: String
    },
    result: {
        type: Array,
        default: []
    },
    attempts : {
        type: Number,
        default: 0
    },
    points: {
        type: Number,
        default: 0
    },
    achived: {
        type: String,
        default: ''
    }
})
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
    ],
    videoWatched:{
        type: Boolean,
        required:true,
        default:false
    },
    quizTaken:{
        type: Boolean,
        required:true,
        default:false
    },
    now:{
        type: Number,
        required:true,
        default:0
    },
    exercise:{
        questions: [
            questionSchema
        ],
        answers: {
            type: Array,
            default: []
        }
    },
    results:[
        resultSchema
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
    discount: {
        type: Number,
        required: false
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

    Instructorrating:{
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
    },
    exercise:{
        questions: [
            questionSchema
        ],
        answers: {
            type: Array,
            default: []
        }
    },
    results:[
        resultSchema
    ]
}, { timestamps: true }, {toObject:{getters: true, }, toJSON:{getters: true}})


module.exports = mongoose.model('Course', courseSchema)
