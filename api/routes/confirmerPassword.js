const { User } = require('../models/user')
const express = require('express')
const jwt = require('jsonwebtoken')
require('dotenv').config()

const router = express.Router()

router.put('/:id', async (req, res) => {
    const token = jwt.verify(req.params.id, process.env.EMAIL_SECRET)
    if (!token)
        return res.status(404).send("Le token n'existe pas ou est erroné")

    let user = await User.findById(token._id)
    if (!user)
        return res
            .status(400)
            .send("Il n'existe pas d'utilisateur correspondant à ce token")

    user.confirmeEmail = true
    await user.save()
    res.status(200).send(user)
})
module.exports = router
