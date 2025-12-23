const postModel = require('../models/post.model');

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.getAllPosts()
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const postDetail = await postModel.getPostById(id)

        if (!postDetail) {
            res.status(404).json({
                message: 'Post not found'
            })
        }

        res.status(200).json(postDetail);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;

        if (!title || !content) {
            res.status(400).json({
                message: 'Title and content are required'
            })
        }

        const newPost = await postModel.createPost({title, content});
        res.status(201).json(newPost);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;

        if (!title || !content) {
            res.status(400).json({
                message: 'Title and content are required'
            })
        }

        const updatedPost = await postModel.updatePost({ id, title, content });
        console.log('updatedPost', updatedPost);

        if(!updatedPost) {
            res.status(404).json({
                message: 'Post not found'
            })
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await postModel.deletePost(id);

        if(!deletedPost) {
            res.status(404).json({
                message: 'Post not found'
            })
        }

        res.status(204).end()
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}