const commentModel = require(`../models/comment.model`);
const postModel = require('../models/post.model');

const getAllComments = async (req, res) => {
    try {
        const comments = await commentModel.getAllComments();
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const commentDetail = await commentModel.getCommentById(id);

        if (!commentDetail) {
            res.status(404).json({
                message: 'Comment not found'
            })
        }

        res.status(200).json(commentDetail);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await postModel.getPostById(postId);
        if (!post) {
            return res.status(404).json({
                message: 'Post not found. Cannot find comments for non-existent post.'
            });
        }

        const comment = await commentModel.getCommentsByPostId(postId);
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

const createComment = async (req, res) => {
    try {
        const { postId, content } = req.body;

        if (!postId || !content) {
            return res.status(400).json({
                message: 'PostId and content are required'
            });
        }

        const post = await postModel.getPostById(postId);
        if (!post) {
            return res.status(404).json({
                message: 'Post not found. Cannot create comment for non-existent post.'
            });
        }


        const newComment = await commentModel.createComment({postId, content});
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        if(!content) {
            return res.status(400).json({
                message: 'Content is required'
            })
        }

        const updateComment = await commentModel.updateComment({ id, content });

        if (!updateComment) {
            return res.status(404).json({
                message: 'Comment not found'
            })
        }

        res.status(200).json(updateComment);
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await commentModel.deleteComment(id);

        if (!deletedComment) {
            return res.status(404).json({
                message: 'Comment not found'
            })
        }

        res.status(204).json({
            message: 'successfully deleted comment'
        });
    } catch (error) {
        res.status(500).json({
            message: 'Server error',
            error: error.message
        })
    }
}

module.exports = {
    getAllComments,
    getCommentById,
    getCommentsByPostId,
    createComment,
    updateComment,
    deleteComment
}