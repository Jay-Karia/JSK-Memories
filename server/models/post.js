const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    date: {
        type: String,
        required: true,
        default: new Date().now
    }
})

const Post = mongoose.model('post', PostSchema)

module.exports = Post