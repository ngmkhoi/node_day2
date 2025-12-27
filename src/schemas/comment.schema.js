module.exports = {
    postId: {required: true, type: 'string'},
    content: {required: true, type: 'string', minLength: 1, maxLength: 500},
}