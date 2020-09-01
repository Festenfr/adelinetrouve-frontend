const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
require('dotenv').config()
const projetSchema = new mongoose.Schema({
    titre: {
        type: String,
        minlength: 1,
        maxlength: 255,
        required: true
    },
    description: {
        type: String,
        minlength: 1,
        maxlength: 500,
        required: true
    },
    surface: {
        type: String,
        minlength: 1,
        maxlength: 255,
        required: true
    },
    date: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    budget: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 255
    },
    placement: {
        type: Number
    },
    isCarousel: {
        type: Boolean,
        required: true
    },
    file1: {
        type: String
    },
    file2: {
        type: String
    }
})

const Projet = mongoose.model('Projet', projetSchema)

function validateProjet(projet) {
    const schema = Joi.object({
        titre: Joi.string()
            .min(1)
            .max(255)
            .required()
            .messages({
                'string.base': 'Le titre doit être une chaine de caractère',
                'string.empty': 'Entrer un type',
                'string.min': `Le titre doit contenir au moins 1 caractères`,
                'string.max':
                    'Le titre doit contenir au maximum 500 caractères',
                'any.required': 'le type est requis'
            }),
        description: Joi.string()
            .min(1)
            .max(500)
            .required()
            .messages({
                'string.base':
                    'La description doit être une chaine de caractère',
                'string.empty': 'Entrer une surface',
                'string.min': `La description doit contenir au moins 1 caractères`,
                'string.max':
                    'La description doit contenir au maximum 255 caractères',
                'any.required': 'la description est requis'
            }),
        surface: Joi.string()
            .min(1)
            .max(255)
            .required()
            .messages({
                'string.base': 'La surface doit être une chaine de caractère',
                'string.empty': 'Entrer une surface',
                'string.min': `La surface doit contenir au moins 1 caractères`,
                'string.max':
                    'La surface doit contenir au maximum 255 caractères',
                'any.required': 'la surface est requis'
            }),
        budget: Joi.string()
            .min(1)
            .max(50)
            .required()
            .messages({
                'string.base': 'Le budget doit être une chaine de caractère',
                'string.empty': 'Entrer une surface',
                'string.min': `Le budget doit contenir au moins 1 caractères`,
                'string.max':
                    'Le budget doit contenir au maximum 50 caractères',
                'any.required': 'la surface est requis'
            }),
        isCarousel: Joi.boolean()
            .required()
            .messages({
                'any.required': 'la surface est requis'
            }),
        date: Joi.string()
            .min(1)
            .max(255)
            .required()
            .messages({
                'string.base': 'La date doit être une chaine de caractère',
                'string.empty': 'Entrer une surface',
                'string.min': `La date doit contenir au moins 1 caractères`,
                'string.max': 'La date doit contenir au maximum 255 caractères',
                'any.required': 'la date est requis'
            }),
        files: Joi.string()
            .min(1)
            .max(500)
            .messages({
                'string.base': 'Les fichiers doit être une chaine de caractère',
                'string.empty': 'Entrer une surface',
                'string.min': `La fichiers doit contenir au moins 1 caractères`,
                'string.max':
                    'La fichiers doit contenir au maximum 255 caractères'
            })
    })

    return schema.validate(projet)
}

exports.validate = validateProjet
exports.Projet = Projet
exports.projetSchema = projetSchema
