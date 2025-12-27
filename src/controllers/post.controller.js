const postModel = require('../models/post.model');

const getAllPosts = async (req, res) => {
    try {
        const posts = await postModel.getAllPosts();
        res.success(posts);
    } catch (error) {
        res.error(error.message, 500);
    }
}

const getPostById = async (req, res) => {
    try {
        const { id } = req.params;
        const postDetail = await postModel.getPostById(id);

        if (!postDetail) {
            return res.error('Post not found', 404);
        }

        res.success(postDetail);
    } catch (error) {
        res.error(error.message, 500);
    }
}

const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newPost = await postModel.createPost({title, content});
        res.success(newPost, 201);
    } catch (error) {
        res.error(error.message, 500);
    }
}

const updatePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const updatedPost = await postModel.updatePost({ id, title, content });

        if(!updatedPost) {
            return res.error('Post not found', 404);
        }

        res.success(updatedPost);
    } catch (error) {
        res.error(error.message, 500);
    }
}

const deletePost = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedPost = await postModel.deletePost(id);

        if(!deletedPost) {
            return res.error('Post not found', 404);
        }

        res.status(204).end();
    } catch (error) {
        res.error(error.message, 500);
    }
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}