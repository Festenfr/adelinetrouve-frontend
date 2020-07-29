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
    let projetImageLength = await ProjetImage.find({ ref: projet._id })
    if (projetImageLength === -1) {
        projetImageLength = 1
    }
    console.log(projetImageLength)
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
                placement: projetImageLength.length,
                ref: projet._id
            })
        } else {
            projetImage = new ProjetImage({
                type: req.body.type,
                file1: s3res.Location,
                placement: projetImageLength.length,
                ref: projet._id
            })
        }

        projetImage = await projetImage.save()
        res.status(200).send(projetImage)
    } catch (err) {
        res.status(422).json({ err })
    }
})
router.put('/:titre/:id', isAdmin, upload.array('files'), async (req, res) => {
    const projet = await Projet.findOne({ titre: req.params.titre })
    const s3 = new aws.S3()
    const rand = Math.round(Math.random() * 1000000)
    const rand2 = Math.round(Math.random() * 1000000)
    let projetImage = await ProjetImage.find({ _id: req.params.id })
    if (!projetImage)
        return res
            .status(404)
            .send("le Projet que tu veux modifier n'existes plus")
    let nameImage = projetImage[0].file1.substring(
        projetImage[0].file1.lastIndexOf('/') + 1
    )
    let keyBucket = decodeURI(nameImage)
    let params = {
        Bucket: `adeline-site-web/projet/${projet.titre}`,
        Key: keyBucket
    }
    let params2
    if (projetImage[0].file2) {
        let nameImage2 = projetImage[0].file2.substring(
            projetImage[0].file2.lastIndexOf('/') + 1
        )
        let keyBucket2 = decodeURI(nameImage2)
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
                    if (projetImage[0].file2) {
                        s3.deleteObject(params2, function(err) {
                            if (err) console.log(err, err.stack)
                            // error
                        })
                    }
                }
            },
            500
        )
    })
    try {
        const buffer = await sharp(req.files[0].path)
            .resize(1400)
            .toBuffer()
        const s3res = await s3
            .upload({
                Bucket: `adeline-site-web/projet/${projet.titre}`,
                Key: `${rand}-${req.files[0].originalname}`,
                Body: buffer,
                ACL: 'public-read'
            })
            .promise()
        if (req.files[1]) {
            const buffer2 = await sharp(req.files[1].path)
                .resize(1400)
                .toBuffer()
            const s3res2 = await s3
                .upload({
                    Bucket: `adeline-site-web/projet/${projet.titre}`,
                    Key: `${rand2}-${req.files[1].originalname}`,
                    Body: buffer2,
                    ACL: 'public-read'
                })

                .promise()
            projetImage[0].type = req.body.typeUpdate
            projetImage[0].file1 = s3res.Location
            projetImage[0].file2 = s3res2.Location
        } else {
            projetImage[0].type = req.body.typeUpdate
            projetImage[0].file1 = s3res.Location
        }
        projetImage[0] = await projetImage[0].save()
        res.status(200).send(projetImage[0])
    } catch (err) {
        res.status(422).json({ err })
    }
})
router.put('/placement/:id/:topOrBottom', isAdmin, async (req, res) => {
    let projetImage = await ProjetImage.findOne({ _id: req.params.id })

    if (!projetImage)
        return res
            .status(404)
            .send("le Projet que tu veux déplacer n'existe plus")
    if (req.params.topOrBottom === 'isTop') {
        let projetImageTop = await ProjetImage.findOne({
            placement: projetImage.placement - 1
        })
        projetImage.placement = projetImage.placement - 1
        projetImageTop.placement = projetImageTop.placement + 1
        projetImage = await projetImage.save()
        projetImageTop = await projetImageTop.save()
        res.status(200).json({
            clickImage: projetImage,
            SideImage: projetImageTop
        })
    } else if (req.params.topOrBottom === 'isBottom') {
        let projetImageBottom = await ProjetImage.findOne({
            placement: projetImage.placement + 1
        })
        projetImage.placement = projetImage.placement + 1
        projetImageBottom.placement = projetImageBottom.placement - 1
        projetImage = await projetImage.save()
        projetImageBottom = await projetImageBottom.save()
        res.status(200).json({
            clickImage: projetImage,
            SideImage: projetImageBottom
        })
    }
})
router.delete('/:titre/:id', isAdmin, async (req, res) => {
    const projet = await Projet.findOne({ titre: req.params.titre })
    const s3 = new aws.S3()
    let projetImage = await ProjetImage.findOneAndDelete({
        _id: req.params.id
    })
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
