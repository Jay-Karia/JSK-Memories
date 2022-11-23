const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    imageURL: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: 'user',
    },
    date: {
        type: String,
        default: new Date().now
    }
})

const Post = mongoose.model('post', PostSchema)

module.exports = Post