const express = require('express')
const app = express()

const mongoose = require('mongoose')
require('dotenv/config')

const bodyParser = require('body-parser')
const postRoute = require('./routes/posts')
const videoRoute = require('./routes/videos')

app.use(bodyParser.json())
app.use('/posts', postRoute)
app.use('/videos', videoRoute)

app.get('/', (req, res) => {
    res.send('Homepage MiniPost')
})

mongoose.connect(process.env.DB_CONNECTOR, () => {
    console.log('DB is now connected!')
})

app.listen(3000, () => {
    console.log('Server is up and running...')
})