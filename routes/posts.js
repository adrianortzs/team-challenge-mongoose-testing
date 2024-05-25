const express = require("express");
const router = express.Router();
const Post = require('../models/post'); 

router.get('/', async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).send(posts);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem fetching the posts' });
    }
});

router.get('/postsWithPagination', async (req, res) => {
    try {
        const {limit = 10, page = 1} = req.query
        const count = await Post.countDocuments()
        const posts = await Post.find().limit(limit * 1).skip( (page - 1 ) * limit).exec();
        res.status(200).json({posts, totalPages: Math.ceil(count/limit), currentPage: page});
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem fetching the posts' });
    }
});

router.get('/id/:_id', async (req, res) => {
    try {
        const post = await Post.findById(req.params._id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem fetching the post' });
    }
});

router.get('/title/:_title', async (req, res) => {
    try {
        const post = await Post.findOne(req.params._id);
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem fetching the post' });
    }
});


router.put('/id/:_id', async (req, res) => {
    try {
        const { title } = req.body;
        if (!title || typeof title !== 'string') {
            return res.status(400).send({ message: 'Invalid title' });
        }
        const post = await Post.findByIdAndUpdate(
            req.params._id,
            { title },
            { new: true, useFindAndModify: false, runValidators: true }
        );
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.status(200).send(post);
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem updating the post' });
    }
});


router.delete('/id/:_id', async (req, res) => {
    try {
        const post = await Post.findByIdAndDelete(req.params._id, { useFindAndModify: false });
        if (!post) {
            return res.status(404).send({ message: 'Post not found' });
        }
        res.status(200).send({ message: 'Post successfully deleted' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ message: 'There was a problem deleting the post' });
    }
});


router.post("/create", async (req, res) => {
    try {
        if (!req.body.title || !req.body.body) {
            res
            .status(500)
            .send({ message: "Must contain title and body" });
        } else {
            const post = await Post.create(req.body);
            res.status(201).send(post);
        }
    } catch (error) {
        console.error(error);
        res
            .status(500)
            .send({ message: "There was a problem trying to create a post" });
    }
});


module.exports = router;