const Joi = require('joi')
const crypto = require('crypto')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
require('dotenv').config()

//Schema
const userSchema = new mongoose.Schema({
    email: {
        type: String,
        match: [
            // eslint-disable-next-line no-useless-escape
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Entrer un email valide'
        ],
        required: [true, 'Entrer un E-mail'],
        minlength: 6,
        maxlength: 255,
        unique: true
    },
    password1: {
        type: String,
        required: [true, 'Entrer un mot de passe'],
        select: false,
        minlength: 6,
        maxlength: 255
    },
    password2: {
        type: String,
        required: true,
        minlength: 6,
        select: false,
        maxlength: 255
    },
    createdAt: String,
    marqueur: {
        type: Number,
        default: 0
    },
    marqueurValide: {
        type: Number,
        default: 0
    },
    articleUtil: {
        type: Number,
        default: 0
    },
    confirmeEmail: {
        type: Boolean,
        default: false
    },
    role: {
        type: String,
        enum: ['utilisateur', 'membre', 'administrateur'],
        default: 'utilisateur'
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

//methods
userSchema.methods.generateEmailConfirm = function() {
    const info = {
        _id: this._id
    }
    const EmailToken = jwt.sign(info, process.env.EMAIL_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
    return EmailToken
}

userSchema.methods.generateAuthToken = function() {
    const info = {
        _id: this._id,
        email: this.email,
        role: this.role,
        marqueur: this.marqueur,
        articleUtil: this.articleUtil,
        confirmeEmail: this.confirmeEmail
    }
    const token = jwt.sign(info, process.env.JWT_PRIVATE_KEY, {
        expiresIn: process.env.JWT_EXPIRE
    })
    return token
}

userSchema.methods.getResetPasswordToken = function() {
    const resetToken = crypto.randomBytes(20).toString('hex')
    this.resetPasswordToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex')

    this.resetPasswordExpire = Date.now() + 10 * 60 * 1000
    return resetToken
}

//Creation document Database
const User = mongoose.model('User', userSchema)

//Validation
function validateUser(user) {
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
            }),
        password2: Joi.any()
            .required()
            .valid(Joi.ref('password1'))
            .options({
                language: {
                    any: {
                        allowOnly: '!! Les mots de passe doivent correspondre!'
                    }
                }
            })
    }
    return Joi.validate(user, schema)
}

exports.validate = validateUser
exports.User = User
exports.userSchema = userSchema
