require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.cookies.access_token
    if (!token) return res.status(200).send('pas de token')
    try {
        const decoded =jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.user = decoded
        next()
    } catch (ex) {
        res.status(400).send('Token non valide')
    }
}