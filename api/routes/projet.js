const router = require('express').Router()
const { Projet, validate } = require('../models/projet')
const sharp = require('sharp')
const aws = require('aws-sdk')
const multer = require('multer')
const isAdmin = require('../middleware/isAdmin')

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './static')
    },
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})
const upload = multer({ storage: storage })

router.get('/', async (req, res) => {
    const projets = await Projet.find({}).sort({ createdAtBis: -1 })
    res.status(200).send(projets)
})

router.post('/', isAdmin, upload.array('files'), async (req, res) => {
    const s3 = new aws.S3()
    const rand1 = Math.round(Math.random() * 1000000)
    const rand2 = Math.round(Math.random() * 1000000)

    const result = validate(req.body)
    if (result.error)
        return res.status(400).send(result.error.details[0].message)
    try {
        const buffer = await sharp(req.files[0].path)
            .resize(1400)
            .toBuffer()
        const s3res = await s3
            .upload({
                Bucket: 'adeline-site-web/projet',
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
                Bucket: 'adeline-site-web/projet',
                Key: `${rand2}-${req.files[1].originalname}`,
                Body: buffer2,
                ACL: 'public-read'
            })
            .promise()
        let projet = new Projet({
            file1: s3res.Location,
            file2: s3res2.Location,
            titre: req.body.titre,
            description: req.body.description,
            budget: req.body.budget,
            surface: req.body.surface,
            isCarousel: req.body.isCarousel,
            date: req.body.date
        })
        projet = await projet.save()
        res.status(200).send(projet)
    } catch (err) {
        res.status(422).json({ err })
    }
})
router.put('/:id', isAdmin, upload.array('files'), async (req, res) => {
    const s3 = new aws.S3()
    const rand = Math.round(Math.random() * 1000000)
    const rand2 = Math.round(Math.random() * 1000000)

    let projet = await Projet.findOne({ _id: req.params.id })
    if (!projet)
        return res
            .status(404)
            .send("le Projet que tu veux modifier n'existes plus")

    let nameImage = projet.file1.substring(projet.file1.lastIndexOf('/') + 1)
    const keyBucket = decodeURI(nameImage)
    const params = { Bucket: 'adeline-site-web/projet', Key: keyBucket }

    let nameImage2 = projet.file2.substring(projet.file2.lastIndexOf('/') + 1)
    const keyBucket2 = decodeURI(nameImage2)
    const params2 = { Bucket: 'adeline-site-web/projet', Key: keyBucket2 }

    setTimeout(() => {
        s3.deleteObject(
            params,
            function(err) {
                if (err) console.log(err, err.stack)
                // error
                else {
                    s3.deleteObject(params2, function(err) {
                        if (err) console.log(err, err.stack) // error
                    })
                }
            },
            500
        )
    })
    try {
        const buffer = await sharp(req.files[0].path)
            .resize(600)
            .toBuffer()
        const s3res = await s3
            .upload({
                Bucket: 'adeline-site-web/projet',
                Key: `${rand}-${req.files[0].originalname}`,
                Body: buffer,
                ACL: 'public-read'
            })
            .promise()
        const buffer2 = await sharp(req.files[1].path)
            .resize(600)
            .toBuffer()
        const s3res2 = await s3
            .upload({
                Bucket: 'adeline-site-web/projet',
                Key: `${rand2}-${req.files[1].originalname}`,
                Body: buffer2,
                ACL: 'public-read'
            })
            .promise()
        ;(projet.titre = req.body.titreUpdate),
            (projet.description = req.body.descriptionUpdate),
            (projet.budget = req.body.budgetUpdate),
            (projet.surface = req.body.surfaceUpdate),
            (projet.date = req.body.dateUpdate),
            (projet.file1 = s3res.Location),
            (projet.file2 = s3res2.Location),
            (projet = await projet.save())
        res.status(200).send(projet)
    } catch (err) {
        res.status(422).json({ err })
    }
})
router.put('/placement/:id/:topOrBottom', isAdmin, async (req, res) => {
    let projet = await Projet.findById(req.params.id)
    let images = await Projet.find({})
    if (!projet)
        return res
            .status(404)
            .send("le Projet que tu veux déplacer n'existe plus")
    if (!images)
        return res
            .status(404)
            .send("le Projet que tu veux déplacer n'existe plus")
    let sortArray = images.map((el) => el.placement).sort((a, b) => a - b)

    let filterArrayLower = sortArray.filter((el) => el < projet.placement)
    const index = filterArrayLower.indexOf(projet.placement)
    if (index > -1) return filterArrayLower.splice(index, 1)
    let lowerValue = filterArrayLower[filterArrayLower.length - 1]

    let filterArraySup = sortArray.filter((el) => el > projet.placement)
    const index2 = filterArraySup.indexOf(projet.placement)
    if (index2 > -1) return filterArraySup.splice(index2, 1)
    let superiorValue = filterArraySup[0]

    function getObjectByValue(arr, value) {
        for (var i = 0, iLen = arr.length; i < iLen; i++) {
            if (arr[i].placement == value) {
                return arr[i]
            }
        }
    }
    if (req.params.topOrBottom === 'isTop') {
        let projetTop = getObjectByValue(images, lowerValue)
        let tamponValue = projet.placement
        projet.placement = projetTop.placement
        projetTop.placement = tamponValue
        projet = await projet.save()
        projetTop = await projetTop.save()
        res.status(200).json({
            clickImage: projet,
            sideImage: projetTop
        })
    } else if (req.params.topOrBottom === 'isBottom') {
        let projetBottom = getObjectByValue(images, superiorValue)
        let tamponValue = projet.placement
        projet.placement = projetBottom.placement
        projetBottom.placement = tamponValue
        projet = await projet.save()
        projetBottom = await projetBottom.save()
        res.status(200).json({
            clickImage: projet,
            sideImage: projetBottom
        })
    }
})
router.delete('/:id', isAdmin, async (req, res) => {
    const s3 = new aws.S3()
    let projet = await Projet.findByIdAndDelete(req.params.id)
    let nameImage = projet.file1.substring(projet.file1.lastIndexOf('/') + 1)
    const keyBucket = decodeURI(nameImage)
    const params = { Bucket: 'adeline-site-web/projet', Key: keyBucket }
    let nameImage2 = projet.file2.substring(projet.file2.lastIndexOf('/') + 1)
    const keyBucket2 = decodeURI(nameImage2)
    const params2 = { Bucket: 'adeline-site-web/projet', Key: keyBucket2 }
    setTimeout(() => {
        s3.deleteObject(
            params,
            function(err) {
                if (err) console.log(err, err.stack)
                // error
                else {
                    s3.deleteObject(params2, function(err) {
                        if (err) console.log(err, err.stack)
                        // error
                        else {
                            res.status(200).send(projet)
                        }
                    })
                }
            },
            500
        )
    })
})
module.exports = router
