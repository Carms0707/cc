const mongoose = require('mongoose')

const VideoSchema = mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    length: {
        type: String,
        require: true
    },
    like: {
        type: String,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    url: {
        type: String,
        require: true
    },
    date: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('videos', VideoSchema)