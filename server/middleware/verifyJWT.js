const jwt = require('jsonwebtoken')

function verifyJWT(req, res, next) {
    try {
        const token = req.headers['x-access-token'].split(' ')[1]
        if (token) {
            jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
                if (err) return res.json({
                    isLoggedIn: false,
                    msg: 'Failed to Authenticate'
                })
                req.user = {}
                req.user.id = decoded.is
                req.user.name = decoded.name
                next()
            })
        } else {
            res.status(400).json({
                msg: 'Incorrect Token given',
                status: "error"
            })
        }
    } catch {
        res.status(400).json({
            msg: 'Incorrect Token given',
            status: "error"
        })
    }
}

module.exports = verifyJWT