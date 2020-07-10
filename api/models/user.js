const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
require('dotenv').config()
const userSchema = new mongoose.Schema({
    type: {
        type: String,
        required: true
    },
    surface: {
        type: String,
        required: true
    },
    pieces: {
        type: Array,
        required: true
    },
    budjet: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    nom: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 11
    },
    email: {
        type: String,
        required: true,
        minlength: 6,
        maxlength: 255,
        unique: true
    },
    password1: {
        type: String,
        required: true,
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
    isAdmin: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date
})

const User = mongoose.model('User', userSchema)

//Validation
function validateUser(user) {
    const schema = Joi.object({
        type: Joi.string()
            .min(1)
            .max(50)
            .required()
            .messages({
                'string.base': 'Le type doit être une chaine de caractère',
                'string.empty': 'Entrer un type',
                'string.min': `Le type doit contenir au moins 1 caractères`,
                'string.max': 'Le type doit contenir au maximum 50 caractères',
                'any.required': 'le type est requis'
            }),
        surface: Joi.string()
            .min(1)
            .max(50)
            .required()
            .messages({
                'string.base': 'La surface doit être une chaine de caractère',
                'string.empty': 'Entrer une surface',
                'string.min': `La surface doit contenir au moins 1 caractères`,
                'string.max':
                    'La surface doit contenir au maximum 50 caractères',
                'any.required': 'la surface est requis'
            }),
        pieces: Joi.array()
            .required()
            .messages({
                'array.empty': 'Ajouter des pieces',
                'any.required': 'Il faut ajouter au moins une piece'
            }),
        budjet: Joi.string()
            .min(1)
            .max(50)
            .required()
            .messages({
                'string.base': 'Le budjet doit être une chaine de caractère',
                'string.empty': 'Entrer une surface',
                'string.min': `Le budjet doit contenir au moins 1 caractères`,
                'string.max':
                    'Le budjet doit contenir au maximum 50 caractères',
                'any.required': 'la surface est requis'
            }),
        nom: Joi.string()
            .min(1)
            .max(50)
            .required()
            .messages({
                'string.base': 'Le nom doit être une chaine de caractère',
                'string.empty': 'Entrer un un nom',
                'string.min': `Le nom doit contenir au moins 1 caractères`,
                'string.max': 'Le nom doit contenir au maximum 50 caractères',
                'any.required': 'le nom est requis'
            }),
        phone: Joi.string()
            .min(1)
            .max(20)
            .required()
            .messages({
                'string.base': 'Le phone doit être une chaine de caractère',
                'string.empty': 'Entrer un un phone',
                'string.min': `Le phone doit contenir au moins 9 caractères`,
                'string.max': 'Le phone doit contenir au maximum 11 caractères',
                'any.required': 'le phone est requis'
            }),
        email: Joi.string()
            .min(6)
            .max(255)
            .email()
            .required()
            .messages({
                'string.base': 'Le mail doit être une chaine de caractère',
                'string.empty': 'Entrer un un mail',
                'string.min': `Le mail doit contenir au moins 2 caractères`,
                'string.max': 'Le mail doit contenir au maximum 255 caractères',
                'string.email': 'Le mail doit etre valide',
                'any.required': 'le mail est requis'
            }),
        password1: Joi.string()
            .min(6)
            .max(255)
            .required()
            .messages({
                'string.base':
                    'Le mot de passe doit être une chaine de caractère',
                'string.empty': 'Entrer un mot de passe',
                'string.min': `Le mot de passe doit contenir au moins 6 caractères`,
                'string.max':
                    'Le mot de passe doit contenir au maximum 50 caractères',
                'any.required': 'le mot de passe est requis'
            }),
        password2: Joi.any()
            .valid(Joi.ref('password1'))
            .required()
            .messages({ 'any.only': `Les mots de passe doivent correspondre` })
    })
    return schema.validate(user)
}
function validateLogin(user) {
    const schema = Joi.object({
        email: Joi.string()
            .min(6)
            .max(255)
            .email()
            .required()
            .messages({
                'string.base': 'Le mail doit être une chaine de caractère',
                'string.empty': 'Entrer un un mail',
                'string.min': `Le mail doit contenir au moins 2 caractères`,
                'string.max': 'Le mail doit contenir au maximum 255 caractères',
                'string.email': 'Le mail doit etre valide',
                'any.required': 'le mail est requis'
            }),
        password: Joi.string()
            .min(6)
            .max(255)
            .required()
            .messages({
                'string.base':
                    'Le mot de passe doit être une chaine de caractère',
                'string.empty': 'Entrer un mot de passe',
                'string.min': `Le mot de passe doit contenir au moins 6 caractères`,
                'string.max':
                    'Le mot de passe doit contenir au maximum 50 caractères',
                'any.required': 'le mot de passe est requis'
            })
    })
    return schema.validate(user)
}
exports.validate = validateUser
exports.validateLogin = validateLogin
exports.User = User
exports.userSchema = userSchema
