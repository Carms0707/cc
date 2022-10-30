const express = require('express')
const router = express.Router()

const Video = require('../models/Video')

// Check that I am logged in
// router.get('/', (req, res) => {
//     res.send('You are in videos')
// })

// POST (Create Data)
router.post('/', async (req, res) => {
    // console.log(req.body) // this is to check what is been sent

    const videoData = new Video ({
        user:req.body.user,
        title:req.body.title,
        length:req.body.length,
        like: req.body.like,
        category: req.body.category,
        url: req.body.url
    })
    // try to insert
    try{
        const videoToSave = await videoData.save()
        res.send(videoToSave)
    }catch(err){
        res.send({message:err})
    }
})

// GET (Read all)
router.get('/', async (req, res) => {
    try{
        const getVideos = await Video.find().limit(10)
        res.send(getVideos)
    }catch(err){
        res.send({message:err})
    }
})

// GET 2 (Read by ID) to get one
router.get('/:videoId', async (req, res) => {
    try{
        const getVideoById = await Video.findById(req.params.videoId)
        res.send(getVideoById)
    }catch(err){
        res.send({message:err})
    }
})

// PATCH (Update)
router.patch('/:videoId', async (req, res) => {
    try{
        const updateVideoById = await Video.updateOne(
            {_id:req.params.videoId},
            {$set: {
                user:req.body.user,
                title:req.body.title,
                length:req.body.length,
                like: req.body.like,
                category: req.body.category,
                url: req.body.url
                }
            })
            res.send(updateVideoById)
    }catch(err){
        res.send({message:err})
    }
})

// DELETE (Delete data)
router.delete('/:videoId', async (req, res) => {
    try{
        const deleteVideoById = await Video.deleteOne({_id:req.params.videoId})
        res.send(deleteVideoById)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router