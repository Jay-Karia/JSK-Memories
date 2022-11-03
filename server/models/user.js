const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    posts: [{
        type: String,
        ref: 'blog'
    }]
})

const User = new mongoose.model('user', UserSchema)
module.exports = User