const express = require("express");
const router = express.Router();
const postRouter = require('./posts.route.js');
const commentRouter = require('./comments.route.js');

router.use('/posts', postRouter);
router.use('/comments', commentRouter);

module.exports = router;
