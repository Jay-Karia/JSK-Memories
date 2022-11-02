const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../models/user')
const Post = require('../models/post')

// localhost:8000/getAllUsers
router.get('/getAllUsers', async(req, res) => {
    let users;
    try {
        users = await User.find()
    } catch (err) {
        return res.status(500).json({ msg: 'Sorry! Some internal server error', error: err })
    }
    if (users.length !== 0) {
        return res.status(200).json({ users: users })
    }
    return res.status(400).json({ msg: 'No users found' })
})

// localhost:8000/register
router.post('/register', async(req, res) => {
    const user = req.body
    user.password = await bcrypt.hash(user.password, 10)
    user.name = user.name.toLowerCase()
    user.email = user.email.toLowerCase()

    const existingUser = await User.findOne({ email: user.email })
    if (existingUser) return res.status(400).json({ msg: 'User already exists. Try to Login instead' })

    try {
        const newUser = new User(user)
        newUser.save()
        return res.status(200).json({ msg: 'Successfully registered a new user', user: user })
    } catch (err) {
        return res.status(500).json({ msg: 'Sorry! Some internal server error', error: err })
    }
})

// localhost:8000/login
router.post('/login', async(req, res) => {
    const user = req.body

    try {
        const existingUser = await User.findOne({ email: user.email })
        if (existingUser) {
            bcrypt.compare(user.password, existingUser.password).then(match => {
                if (match) {
                    return res.status(200).json({ user: existingUser })
                } else {
                    return res.status(400).json({ msg: 'Email or password does not match' })
                }
            })
        } else {
            return res.status(400).json({ msg: 'Email or password does not match' })
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Sorry! Some internal server error', error: err })
    }
})

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

    try {
        const newPost = new Post(post)
        newPost.save()
        return res.status(200).json({ msg: 'Successfully created a new post', post: post })
    } catch (err) {
        return res.status(500).json({ msg: 'Sorry! Some internal server error', error: err })
    }
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
        const existingPost = await Post.findByIdAndDelete(id)
        if (!existingPost) return res.status(400).json({ msg: 'Could not find post' })
        return res.status(200).json({ msg: 'Post Successfully deleted' })
    } catch (err) {
        return res.status(500).json({ msg: 'Sorry! Some internal server error', error: err })
    }
})

module.exports = router