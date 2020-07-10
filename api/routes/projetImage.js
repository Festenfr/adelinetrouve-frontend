const router = require('express').Router()
const { Projet } = require('../models/projet')
const { ProjetImage, validate } = require('../models/projetImage')
const isAdmin = require('../middleware/isAdmin')
const aws = require('aws-sdk')
const sharp = require('sharp')
const multer = require('multer')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './static')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage })

router.get('/:titre', async (req, res) => {
    const projet = await Projet.findOne({ titre: req.params.titre })
    const projetImage = await ProjetImage.find({ ref: projet._id })
    res.status(200).send(projetImage)
})
router.post('/:titre', isAdmin, upload.array('files'), async (req, res) => {
    const s3 = new aws.S3()
    const rand1 = Math.round(Math.random() * 1000000)
    const rand2 = Math.round(Math.random() * 1000000)

    const projet = await Projet.findOne({ titre: req.params.titre })
    const result = validate(req.body)
    if (result.error)
        return res.status(400).send(result.error.details[0].message)
    try {
        const buffer = await sharp(req.files[0].path)
            .resize(1400)
            .toBuffer()
        const s3res = await s3
            .upload({
                Bucket: `adeline-site-web/projet/${projet.titre}`,
                Key: `${rand1}-${req.files[0].originalname}`,
                Body: buffer,
                ACL: 'public-read'
            })
            .promise()
        const buffer2 = await sharp(req.files[1].path)
            .resize(800)
            .toBuffer()
        const s3res2 = await s3
            .upload({
                Bucket: `adeline-site-web/projet/${projet.titre}`,
                Key: `${rand2}-${req.files[1].originalname}`,
                Body: buffer2,
                ACL: 'public-read'
            })
            .promise()
        let projetImage = new ProjetImage({
            type: req.body.type,
            file1: s3res.Location,
            file2: s3res2.Location,
            ref: projet._id
        })
        projetImage = await projetImage.save()
        res.status(200).send(projetImage)
    } catch (err) {
        res.status(422).json({ err })
    }
})
router.post('/:titre/1', isAdmin, upload.array('files'), async (req, res) => {
    const s3 = new aws.S3()
    const rand1 = Math.round(Math.random() * 1000000)
    const rand2 = Math.round(Math.random() * 1000000)

    const projet = await Projet.findOne({ titre: req.params.titre })
    const result = validate(req.body)
    if (result.error)
        return res.status(400).send(result.error.details[0].message)
    try {
        const buffer = await sharp(req.files[0].path)
            .resize(1400)
            .toBuffer()
        const s3res = await s3
            .upload({
                Bucket: `adeline-site-web/projet/${projet.titre}`,
                Key: `${rand1}-${req.files[0].originalname}`,
                Body: buffer,
                ACL: 'public-read'
            })
            .promise()
        const buffer2 = await sharp(req.files[1].path)
            .resize(800)
            .toBuffer()
        const s3res2 = await s3
            .upload({
                Bucket: `adeline-site-web/projet/${projet.titre}`,
                Key: `${rand2}-${req.files[1].originalname}`,
                Body: buffer2,
                ACL: 'public-read'
            })
            .promise()
        let projetImage = new ProjetImage({
            type: req.body.type,
            file1: s3res.Location,
            file2: s3res2.Location,
            ref: projet._id
        })
        projetImage = await projetImage.save()
        res.status(200).send(projetImage)
    } catch (err) {
        res.status(422).json({ err })
    }
})
module.exports = router
