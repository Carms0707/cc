const express = require('express')
const router = express.Router()

const Post = require('../models/Post')

// this is to check that you log in initially
// router.get('/', (req, res) => { 
//     res.send('You are in posts!')
// })

// POST (Create data)
router.post('/', async (req, res) => {
    console.log(req.body)
    
    // Always we need to create a new model, this will be map to the model 
    // of mongoose and mongoose will help us to do this directly in the MongoDB
    const postData = new Post ({
        user:req.body.user,
        title:req.body.title,
        text:req.body.text,
        hashtag:req.body.hashtag,
        location:req.body.location,
        url:req.body.url
    })
    // try to insert...
    try{
        const postToSave = await postData.save() // .save is the method to save the data, asumming that you created also your model already
        res.send(postToSave)
    }catch(err){
        res.send({message:err})
    }
})

// GET 1 (Read all) to get everything
router.get('/', async (req, res) => {
    try{
        const getPosts = await Post.find().limit(10) // good practice to use .limit, to see sample of data only and not all
        res.send(getPosts)
    }catch(err){
        res.send({message:err})
    }
})

// GET 2 (Read by ID) to get one
router.get('/:postId', async (req, res) => {
    try{
        const getPostById = await Post.findById(req.params.postId)
        res.send(getPostById)
    }catch(err){
        res.send({message:err})
    }
})

// PATCH (Update)
// we need to control lots of things
// 1. We need to POST ID from the user
// 2. Match it with POST ID from the database
// 3. and Set the new data with the data the user gives
// 4. Update it
router.patch('/:postId', async(req, res) => {
    try{
        const updatePostById = await Post.updateOne(
            // Before setting data, you need to match ID in the database with the user ID
            {_id:req.params.postId},
            {$set: {
                user:req.body.user,
                title:req.body.title,
                text:req.body.text,
                hashtag:req.body.hashtag,
                location:req.body.location,
                url:req.body.url
                }
            })
            // Always send back your data to see what is happening (we capture the output of MongoDB)
            res.send(updatePostById)
    }catch(err){
        res.send({message:err})
    }
})

// DELETE (Delete) data
// It is not a really good practice to delete data, real life normally make a copy of the data
router.delete('/:postId', async(req, res) => {
    try{
        const deletePostById = await Post.deleteOne({_id:req.params.postId})
        res.send(deletePostById)
    }catch(err){
        res.send({message:err})
    }
})

module.exports = router