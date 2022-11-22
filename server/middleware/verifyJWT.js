const jwt = require('jsonwebtoken')
const User = require('../models/user')

async function verifyJWT (req, res, next) {
    try {
        const token = req.headers['x-access-token'].split(' ')[1]
        if (token) {
            jwt.verify(token, process.env.PASSPORTSECRET, async (err, decoded) => {
                if (err) return res.json({
                    isLoggedIn: false,
                    msg: 'Failed to Authenticate',
                    err: err
                })
                const user = await User.findById(decoded.id)
                res.status(200).json({
                    payload:user,
                    status:'ok'
                })
                next()
            })
        } else {
            res.json({
                msg: 'No Token given',
                status: "error"
            })
        }
    } catch {
        res.json({
            msg: 'Incorrect Token given',
            status: "error"
        })
    }
}

module.exports = verifyJWT