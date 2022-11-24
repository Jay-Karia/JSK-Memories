const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router()

const Post = require('../models/post')
const User = require('../models/user')
const Image = require('../models/image')

const verifyJWT = require('../middleware/verifyJWT')
const multer = require('multer')

let image_name = ''

// multer storage
const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null,uniqueSuffix+'-'+file.originalname)
        image_name = uniqueSuffix+'-'+file.originalname
      }
})

const upload = multer({
    storage: Storage
}).single('testImage')

// localhost:8000/getAllPosts
router.get('/getAllPosts', async(req, res) => {
    let posts;
    try {
        posts = await Post.find().populate('user')
        // return res.status(200).json({ yourPosts: posts })
    } catch (err) {
        return res.status(500).json({ msg: 'Sorry! Some internal server error', error: err })
    }
    if (posts.length !== 0) {
        return res.status(200).json({ posts: posts })
    } else {
        return res.status(400).json({ msg: 'No posts found' })
    }
})

// localhost:8000/addPost
router.post('/addPost', upload, async(req, res) => {
    const post = req.body
    console.log(image_name)

    const image = new Image({
        name: image_name,
        image: {
            data: image_name,
            contentType: 'image/png'
        }
    })
    image.save().then(()=>{
        res.json({
            msg: 'Success'
        })
    })

    res.json({
        msg:'Success'
    })

    // let existingUser;
    // try {
    //     existingUser = await User.findById(post.user)
    // } catch (err) {
    //     return res.status(500).json({ msg: 'Sorry! Some internal server error', error: err, status:'error' })
    // }
    // if (!existingUser) {
    //     return res.status(200).json({ msg: 'No users found' , status:'error'})
    // }
    // const newPost = new Post(post)

    // const session = await mongoose.startSession()
    // session.startTransaction()
    // await newPost.save({ session })
    // existingUser.posts.push(newPost._id)
    // await existingUser.save({ session })
    // await session.commitTransaction()

    // return res.status(200).json({ msg: 'Successfully created a new post', post: post, status:'ok' })
})

// localhost:8000/updatePost/id
router.put('/updatePost/:id', async(req, res) => {
    const post = req.body
    const id = req.params.id
    try {
        const updatePost = await Post.findByIdAndUpdate(id, post)
        if (!updatePost) return res.status(400).json({ msg: 'Could not find post' })

        return res.status(200).json({ msg: 'Successfully Updated', post: await Post.findById(id) })
    } catch (err) {
        return res.status(500).json({ msg: 'Sorry! Some internal server error', error: err })
    }
})

// localhost:8000/getPost/id
router.get('/getPost/:id', async(req, res) => {
    let id = req.params.id
    try {
        const existingPost = await Post.findById(id)

        if (!existingPost) return res.status(400).json({ msg: 'Could not find post' })
        return res.status(200).json({ post: existingPost })
    } catch (err) {
        return res.status(500).json({ msg: 'Sorry! Some internal server error', error: err })
    }

})

// localhost:8000/deletePost/id
router.delete('/deletePost/:id', async(req, res) => {
    let id = req.params.id
    try {
        const existingPost = await Post.findById(id).populate('user')
        const user = await User.findById(existingPost.user)

        for (let i = 0; i < user.posts.length; i++) {
            if (existingPost._id.toString() === user.posts[i]) {
                await user.posts.splice(i, 1)
                await user.save()
            }
        }

        const post_ = await Post.findByIdAndDelete(id)

        if (existingPost.length === 0) {
            if (!existingPost) return res.status(400).json({ msg: 'Could not find post' })
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Sorry! Some internal server error', error: err })
    }

    return res.status(200).json({ msg: 'Post Successfully deleted' })
})

module.exports = router;