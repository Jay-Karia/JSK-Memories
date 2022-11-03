const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')

const User = require('../models/user')

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

// localhost:host:8000/getUser/id
router.get('/getUser/:id', async(req, res) => {
    let user;
    try {
        user = await User.findById(req.params.id)
    } catch (err) {
        return res.status(500).json({ msg: 'Sorry! Some internal server error', error: err })
    }
    if (user.length !== 0) {
        return res.status(200).json({ user: user })
    }
    return res.status(400).json({ msg: 'No users found' })
})

module.exports = router;