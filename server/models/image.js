const mongoose = require('mongoose')

const ImageSchema = new mongoose.Schema({
    name: {
        type:String
    },
    image: {
        data: Buffer,
        contentType: String
    }
})

const Image = mongoose.model('image', ImageSchema)

module.exports = Image