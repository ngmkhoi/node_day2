const express = require('express');
const router = express.Router();
const commentController = require('../controllers/comment.controller');
const { validate } = require('../middlewares/validation.middleware');
const commentSchema = require('../schemas/comment.schema');

router.get('/', commentController.getAllComments);

router.get('/:id', commentController.getCommentById);

router.post('/', validate(commentSchema), commentController.createComment);

router.put('/:id', validate(commentSchema), commentController.updateComment);

router.delete('/:id', commentController.deleteComment);

module.exports = router;