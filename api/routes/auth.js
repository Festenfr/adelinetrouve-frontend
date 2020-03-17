const bcrypt = require('bcrypt')
const _ = require('lodash')
const { User } = require('../models/user')
const express = require('express')
const Joi = require('joi')
const jwt = require('jsonwebtoken')
require('dotenv').config()
const Cookies = require('cookies')
const router = express.Router()

router.post('/', async (req, res) => {
    const result = validate(req.body)
    if (result.error)
        return res.status(400).send(result.error.details[0].message)

    let user = await User.findOne({ email: req.body.email }).select(
        '+password1'
    )
    if (!user) return res.status(400).send('Email ou mot de passe invalide')

    if (!user.confirmeEmail) {
        return res
            .status(400)
            .send('Veuillez confirmer votre email pour vous connecter')
    }
    const validPassword = await bcrypt.compare(
        req.body.password1,
        user.password1
    )
    if (!validPassword)
        return res.status(400).send('Email ou mot de passe invalide')

    const token = user.generateAuthToken()
    const options = {
        expires: new Date(
            Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }
    if (process.env.NODE_ENV === 'production') {
        options.sercure = true
    }
    new Cookies(req, res).set('access_token', token, options)

    res.status(200).send('Connecté')
})

function validate(req) {
    const schema = {
        email: Joi.string()
            .min(6)
            .max(255)
            .email()
            .required()
            .error((errors) => {
                errors.forEach((err) => {
                    switch (err.type) {
                        case 'string.base':
                            err.message = 'Doit etre une chaine de caractères!'
                            break
                        case 'string.min':
                            err.message = `Le mail doit contenir au moins ${err.context.limit} caractères!`
                            break
                        case 'string.max':
                            err.message = `Le mail ne doit pas contenir plus de ${err.context.limit} caractères!`
                            break
                        case 'any.email':
                            err.message = `l'adresse mail n'est pas valide`
                            break
                        case 'any.required':
                            err.message = `Le mail est requis`
                            break
                        default:
                            break
                    }
                })
                return errors
            }),
        password1: Joi.string()
            .min(6)
            .max(255)
            .required()
            .error((errors) => {
                errors.forEach((err) => {
                    switch (err.type) {
                        case 'string.base':
                            err.message = 'Doit etre une chaine de caractères!'
                            break
                        case 'string.min':
                            err.message = `Le mot de passe doit contenir au moins ${err.context.limit} caractères!`
                            break
                        case 'string.max':
                            err.message = `Le mot de passe ne doit pas contenir plus de ${err.context.limit} caractères!`
                            break
                        case 'any.required':
                            err.message = `Le mot de passe est requis`
                            break
                        default:
                            break
                    }
                })
                return errors
            })
    }
    return Joi.validate(req, schema)
}

module.exports = router
