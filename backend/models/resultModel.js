const mongoose = require('mongoose')
const {Schema} = mongoose;


const resultModel = new Schema({
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
}, { timestamps: true }, {toObject:{getters: true, }, toJSON:{getters: true}})

module.exports = mongoose.model('result',resultModel)