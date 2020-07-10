require('dotenv').config()
const jwt = require('jsonwebtoken')
module.exports = function isAdmin(req, res, next) {
    const bearerHeader = req.headers['authorization']
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ')
        const bearerToken = bearer[1]
        const decoded = jwt.verify(bearerToken, process.env.JWT_PRIVATE_KEY)
        if (decoded.payload.isAdmin === true) {
            next()
        }
    } else {
        res.status(401).send("Vous n'êtes pas autorisé")
    }
}
