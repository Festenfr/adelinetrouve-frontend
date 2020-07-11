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

router.get('/:titre/1', async (req, res) => {
    const projet = await Projet.findOne({ titre: req.params.titre })
    res.status(200).send(projet)
})
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
        let projetImage
        if (req.files[1]) {
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
            projetImage = new ProjetImage({
                type: req.body.type,
                file1: s3res.Location,
                file2: s3res2.Location,
                ref: projet._id
            })
        } else {
            projetImage = new ProjetImage({
                type: req.body.type,
                file1: s3res.Location,
                ref: projet._id
            })
        }

        projetImage = await projetImage.save()
        res.status(200).send(projetImage)
    } catch (err) {
        res.status(422).json({ err })
    }
})
router.delete('/:titre/:id', isAdmin, async (req, res) => {
    const projet = await Projet.findOne({ titre: req.params.titre })
    const s3 = new aws.S3()
    let projetImage = await ProjetImage.findOneAndDelete({ ref: projet._id })
    let nameImage = projetImage.file1.substring(
        projetImage.file1.lastIndexOf('/') + 1
    )
    const keyBucket = decodeURI(nameImage)
    const params = {
        Bucket: `adeline-site-web/projet/${projet.titre}`,
        Key: keyBucket
    }
    let params2
    if (projetImage.file2) {
        let nameImage2 = projetImage.file2.substring(
            projetImage.file2.lastIndexOf('/') + 1
        )
        const keyBucket2 = decodeURI(nameImage2)
        params2 = {
            Bucket: `adeline-site-web/projet/${projet.titre}`,
            Key: keyBucket2
        }
    }

    setTimeout(() => {
        s3.deleteObject(
            params,
            function(err) {
                if (err) console.log(err, err.stack)
                // error
                else {
                    if (projetImage.file2) {
                        s3.deleteObject(params2, function(err) {
                            if (err) console.log(err, err.stack)
                            // error
                            else {
                                res.status(200).send(projetImage)
                            }
                        })
                    } else {
                        res.status(200).send(projetImage)
                    }
                }
            },
            500
        )
    })
})

module.exports = router
