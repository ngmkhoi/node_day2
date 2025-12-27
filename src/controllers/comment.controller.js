const commentModel = require(`../models/comment.model`);
const postModel = require('../models/post.model');

const getAllComments = async (req, res) => {
    try {
        const comments = await commentModel.getAllComments();
        res.success(comments);
    } catch (error) {
        res.error(error.message, 500);
    }
}

const getCommentById = async (req, res) => {
    try {
        const { id } = req.params;
        const commentDetail = await commentModel.getCommentById(id);

        if (!commentDetail) {
            return res.error('Comment not found', 404);
        }

        res.success(commentDetail);
    } catch (error) {
        res.error(error.message, 500);
    }
}

const getCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.params;
        const post = await postModel.getPostById(postId);
        if (!post) {
            return res.error('Post not found. Cannot find comments for non-existent post.', 404);
        }

        const comment = await commentModel.getCommentsByPostId(postId);
        res.success(comment);
    } catch (error) {
        res.error(error.message, 500);
    }
}

const createComment = async (req, res) => {
    try {
        const { postId, content } = req.body;

        const post = await postModel.getPostById(postId);
        if (!post) {
            return res.error('Post not found. Cannot create comment for non-existent post.', 404);
        }

        const newComment = await commentModel.createComment({postId, content});
        res.success(newComment, 201);
    } catch (error) {
        res.error(error.message, 500);
    }
}

const updateComment = async (req, res) => {
    try {
        const { id } = req.params;
        const { content } = req.body;

        const updateComment = await commentModel.updateComment({ id, content });

        if (!updateComment) {
            return res.error('Comment not found', 404);
        }

        res.success(updateComment);
    } catch (error) {
        res.error(error.message, 500);
    }
}

const deleteComment = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedComment = await commentModel.deleteComment(id);

        if (!deletedComment) {
            return res.error('Comment not found', 404);
        }

        res.status(204).end();
    } catch (error) {
        res.error(error.message, 500);
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