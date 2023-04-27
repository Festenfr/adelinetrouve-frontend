const { User, validate } = require('../models/user')
const express = require('express')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

require('dotenv').config()
const router = express.Router()

router.post('/', async (req, res) => {
    const result = validate(req.body)
    if (result.error) return res.status(400).send(result.error)

    let user = await User.findOne({ email: req.body.email })
    if (user)
        return res
            .status(400)
            .send('Vous avez déja un projet en cours avec cette adresse mail')

    if (req.body) {
        let user = new User({
            type: req.body.type,
            surface: req.body.surface,
            budjet: req.body.budjet,
            pieces: req.body.pieces,
            nom: req.body.nom,
            phone: req.body.phone,
            email: req.body.email.toLowerCase(),
            password1: req.body.password1,
            password2: req.body.password2
        })

        const token = jwt.sign(
            { id: user._id, email: user.email },
            process.env.JWT_PRIVATE_KEY
        )
        const salt = await bcrypt.genSalt(10)
        user.password1 = await bcrypt.hash(user.password1, salt)
        const salt2 = await bcrypt.genSalt(10)
        user.password2 = await bcrypt.hash(user.password2, salt2)

        user = await user.save()
        res.status(200).json({
            token,
            user: {
                type: user.type,
                surface: user.surface,
                budjet: user.budjet,
                pieces: user.pieces,
                nom: user.nom,
                phone: user.nom,
                email: user.email,
                isAdmin: user.isAdmin
            }
        })
    } else {
        res.status(400).send("La requête n'a pas de contenu")
    }
})

module.exports = router
