const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller');

router.get('/', postController.getAllPosts);

router.get('/:id', postController.getPostById);

router.get('/:postId/comments', commentController.getCommentsByPostId);

router.post('/', postController.createPost);

router.put('/:id', postController.updatePost);

router.delete('/:id', postController.deletePost);

module.exports = router;
