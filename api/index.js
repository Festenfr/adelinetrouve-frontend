const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const aws = require('aws-sdk')
const app = express()
const register = require('./routes/register')
const login = require('./routes/login')
const projet = require('./routes/projet')
const projetImage = require('./routes/projetImage')

if (!process.env.JWT_PRIVATE_KEY) {
    console.error('FATAL ERROR: jwtPrivateKey is not defined')
    process.exit(1)
}
mongoose
    .connect(
        `mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@cluster0-zledd.mongodb.net/test?retryWrites=true&w=majority`,
        { useUnifiedTopology: true, useNewUrlParser: true }
    )
    .then(() => console.log('Connected to mongoDb..'))
    .catch(() => console.log('Could not connect to mongodb'))
mongoose.set('useCreateIndex', true)
aws.config.update({
    accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
    secretAccessKey: `${process.env.AWS_SECRET_KEY}`
})

app.use('static', express.static('static'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/register', register)
app.use('/login', login)
app.use('/projet', projet)
app.use('/projetImage', projetImage)

module.exports = {
    path: '/api',
    handler: app
}
