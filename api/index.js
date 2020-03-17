const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const aws = require('aws-sdk')
const app = express()
const user = require('./routes/user')
const auth = require('./routes/auth')
const confirmerPassword = require('./routes/confirmerPassword')
const forgotPassword = require('./routes/forgotPassword')

// if (!process.env.JWT_PRIVATE_KEY){
//     console.error('FATAL ERROR: jwtPrivateKey is not defined');
//     process.exit(1)
// }

// mongoose.connect(`mongodb+srv://${process.env.MONGODB_USER}:${process.env.MONGODB_PASSWORD}@chiropteres-6dke0.mongodb.net/test?retryWrites=true&w=majority`,{useUnifiedTopology: true ,  useNewUrlParser: true })
//     .then(() => console.log('Connected to mongoDb..')    )
//     .catch(err => console.log('Could not connect to mongodb'))
//     mongoose.set('useCreateIndex', true);

// aws.config.update({
//     accessKeyId: `${process.env.AWS_ACCESS_KEY}`,
//     secretAccessKey: `${process.env.AWS_SECRET_KEY}`
// })

app.use('uploads', express.static('uploads'))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/user', user)
app.use('/auth', auth)
app.use('/forgotPassword', forgotPassword)
app.use('/confirmerPassword', confirmerPassword)

module.exports = {
    path: '/api',
    handler: app
}
