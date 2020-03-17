const bcrypt = require('bcrypt')
const _ = require('lodash')
const { User, validate } = require('../models/user')
const express = require('express')
const sendEmail = require('../utils/SendEmail')
const dateFormat = require('dateformat')
const auth = require('../middleware/auth')
const isAdmin = require('../middleware/isAdmin')
require('dotenv').config()

const router = express.Router()

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id)
    if (!user) return res.status(400).send('non connecté')
    res.status(200).send(user)
})
router.post('/me', auth, async (req, res) => {
    res.clearCookie('access_token').send('Cookie clear')
})
router.delete('/me', auth, async (req, res) => {
    await User.findByIdAndDelete(req.user._id)
    res.clearCookie('access_token').send('Cookie clear')
})

router.get('/', isAdmin, async (req, res) => {
    const user = await User.find({})
    res.send(user)
})
router.delete('/:id', isAdmin, async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id)
    res.status(200).send(user)
})
router.post('/', async (req, res) => {
    var now = new Date()
    const date = dateFormat(now, 'dd/mm/yy à HH:MM:ss')
    const result = validate(req.body)
    if (result.error)
        return res.status(400).send(result.error.details[0].message)

    let user = await User.findOne({ email: req.body.email })
    if (user)
        return res
            .status(400)
            .send('Il existe déja un utilisateur avec cette adresse E-mail')

    user = new User({
        email: req.body.email,
        password1: req.body.password1,
        password2: req.body.password2,
        createdAt: date
    })
    const salt = await bcrypt.genSalt(10)
    user.password1 = await bcrypt.hash(user.password1, salt)
    const salt2 = await bcrypt.genSalt(10)
    user.password2 = await bcrypt.hash(user.password2, salt2)
    await user.save()

    const emailToken = user.generateEmailConfirm()
    const resetUrl = `${req.protocol}://${req.get(
        'host'
    )}/confirmation/${emailToken}`
    const message = `Bonjour, \n \n Veuillez suivre ce lien : ${resetUrl} pour confirmer! \n \n L'association Chiroptères 37`

    try {
        await sendEmail({
            email: user.email,
            subject: 'Confirmation Email Chiroptères 37',
            message
        })
        res.status(200).send(
            'Vous êtes inscrit(e), un e-mail vous a été envoyé pour confirmer votre adresse!'
        )
    } catch (err) {
        res.status(500).send("Une erreur s'est produite, veuillez réessayer")
    }
})
router.put('/:indice', isAdmin, async (req, res) => {
    let user = await User.findOne({ _id: req.params.indice })
    if (!user)
        return res
            .status(404)
            .send("le texte que vous voulez modifier n'existe plus")

    user.role = req.body.role

    user = await user.save()
    res.status(200).send(user)
})
module.exports = router
