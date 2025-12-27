const express = require('express');
const router = express.Router();
const postController = require('../controllers/post.controller');
const commentController = require('../controllers/comment.controller');
const { validate } = require('../middlewares/validation.middleware');
const postSchema = require('../schemas/post.schema');


router.get('/', postController.getAllPosts);

router.get('/:id', postController.getPostById);

router.get('/:postId/comments', commentController.getCommentsByPostId);

router.post('/', validate(postSchema), postController.createPost);

router.put('/:id', validate(postSchema), postController.updatePost);

router.delete('/:id', postController.deletePost);

module.exports = router;
