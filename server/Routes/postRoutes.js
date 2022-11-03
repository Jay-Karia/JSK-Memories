const express = require('express');
const { default: mongoose } = require('mongoose');
const router = express.Router()

const Post = require('../models/post')
const User = require('../models/user')

// localhost:8000/getAllPosts
router.get('/getAllPosts', async(req, res) => {
    let posts;
    try {
        posts = await Post.find()
    } catch (err) {
        return res.status(500).json({ msg: 'Sorry! Some internal server error', error: err })
    }
    if (posts.length !== 0) {
        return res.status(200).json({ posts: posts })
    }
    return res.status(400).json({ msg: 'No posts found' })
})

// localhost:8000/addPost
router.post('/addPost', async(req, res) => {
    const post = req.body
    let existingUser;
    try {
        existingUser = await User.findById(post.user)
    } catch (err) {
        return res.status(500).json({ msg: 'Sorry! Some internal server error', error: err })
    }
    if (!existingUser) {
        return res.status(200).json({ msg: 'No users found' })
    }
    const newPost = new Post(post)

    const session = await mongoose.startSession()
    session.startTransaction()
    await newPost.save({ session })
    existingUser.posts.push(newPost)
    await existingUser.save({ session })
    await session.commitTransaction()

    return res.status(200).json({ msg: 'Successfully created a new post', post: post })
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
    const existingPost = await Post.findById(id)

    let existingUser = await User.findById(existingPost.user)



    // await Post.deleteOne({ _id: id })

    if (!existingPost) return res.status(400).json({ msg: 'Could not find post' })
    return res.status(200).json({ msg: 'Post Successfully deleted' })
})

module.exports = router;