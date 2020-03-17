require('dotenv').config()
const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    const token = req.cookies.access_token
    if (!token) return res.status(200).send('pas de token')
    const decoded =jwt.verify(token, process.env.JWT_PRIVATE_KEY);
    if (decoded.role == 'administrateur') {
        req.user = decoded
        next()
    }
    else{
        res.status(400).send('Token non valide')        
    }

}