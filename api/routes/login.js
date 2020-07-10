const { User, validateLogin } = require('../models/user')
const bcrypt = require('bcrypt')
const express = require('express')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const router = express.Router()

router.post('/', async (req, res) => {
    const result = validateLogin(req.body)
    if (result.error)
        return res.status(400).send(result.error.details[0].message)

    let user = await User.findOne({
        email: req.body.email.toLowerCase()
    }).select('+password1')
    if (!user)
        return res
            .status(400)
            .send(
                "Email ou mot de passe invalide ou vous n'avez pas encore crée de projet"
            )

    const validPassword = await bcrypt.compare(
        req.body.password,
        user.password1
    )
    if (!validPassword)
        return res
            .status(400)
            .send(
                "Email ou mot de passe invalide ou vous n'avez pas encore crée de projet"
            )

    let payload = {
        id: user._id,
        email: user.email.toLowerCase(),
        type: user.type,
        surface: user.surface,
        budjet: user.budjet,
        pieces: user.pieces,
        nom: user.nom,
        isAdmin: user.isAdmin,
        phone: user.phone
    }
    const token = jwt.sign({ payload }, process.env.JWT_PRIVATE_KEY)

    res.status(200).json({ token, user: payload })
})

module.exports = router
