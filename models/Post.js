const mongoose = require('mongoose')

const PostSchema = mongoose.Schema({
    user: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    }, 
    text: {
        type: String,
        require: true
    },
    hashtag: {
        type: String,
        require: true
    },
    location: {
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

module.exports = mongoose.model('posts', PostSchema)