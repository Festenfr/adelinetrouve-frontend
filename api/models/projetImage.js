const Joi = require('@hapi/joi')
const mongoose = require('mongoose')
require('dotenv').config()
const ProjetImageSchema = new mongoose.Schema({
    type: {
        type: String,
        minlength: 1,
        maxlength: 255,
        required: true
    },
    placement: {
        type: Number
    },
    file1: {
        type: String
    },
    file2: {
        type: String
    },
    ref: {
        type: String
    }
})

const ProjetImage = mongoose.model('ProjetImage', ProjetImageSchema)

function validateProjetImage(projet) {
    const schema = Joi.object({
        type: Joi.string()
            .min(1)
            .max(255)
            .required()
            .messages({
                'string.base': 'Le titre doit être une chaine de caractère',
                'string.empty': 'Entrer un type',
                'string.min': `Le titre doit contenir au moins 1 caractères`,
                'string.max':
                    'Le titre doit contenir au maximum 255 caractères',
                'any.required': 'le type est requis'
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

exports.validate = validateProjetImage
exports.ProjetImage = ProjetImage
exports.ProjetImageSchema = ProjetImageSchema
