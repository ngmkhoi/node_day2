const {loadDB, saveDB} = require("../utils/jsonDB");
const RESOURCE_NAME = 'comments';

const getAllComments = async () => {
    return await loadDB(RESOURCE_NAME);
};

const getCommentById = async (id) => {
    const comments = await loadDB(RESOURCE_NAME);
    return comments.find(comment => comment.id === parseInt(id)) || null;
}

const getCommentsByPostId = async (postId) => {
    const comments = await loadDB(RESOURCE_NAME);
    return comments.filter(comment => comment.postId === parseInt(postId));
};

const createComment = async (data) => {
    const comments = await loadDB(RESOURCE_NAME);
    const commentId = comments.length === 0 ? 1 : Math.max(...comments.map(comment => comment.id)) + 1;
    const newComment = {
        id: commentId,
        postId:  parseInt(data.postId),
        content: data.content,
        createdAt: new Date().toISOString()
    }
    comments.push(newComment);
    await saveDB(RESOURCE_NAME, comments);
    return newComment;
}

const updateComment = async (data) => {
    const comments = await loadDB(RESOURCE_NAME);
    const commentIndex = comments.findIndex(c => c.id === parseInt(data.id));
    if(commentIndex !== -1) {
        const { id, postId, createdAt, ...updateData } = data;
        comments[commentIndex] = { ...comments[commentIndex], ...updateData };
        await saveDB(RESOURCE_NAME, comments);
    }
    return comments[commentIndex] || null;
}

const deleteComment = async (id) => {
    const comments = await loadDB(RESOURCE_NAME);
    const commentIndex = comments.findIndex(c => c.id === parseInt(id));
    let deletedComment = null;
    if (commentIndex !== -1) {
        deletedComment = comments.splice(commentIndex, 1);
        await saveDB(RESOURCE_NAME, comments);
    }
    return deletedComment;
}

module.exports = {
    getAllComments,
    getCommentById,
    createComment,
    updateComment,
    deleteComment,
    getCommentsByPostId
}