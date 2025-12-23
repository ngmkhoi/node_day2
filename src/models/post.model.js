const {loadDB, saveDB} = require("../../utils/jsonDB");
const RESOURCE_NAME = 'posts';

const getAllPosts = async () => {
    return await loadDB(RESOURCE_NAME);
};

const getPostById = async (id) => {
    const posts = await loadDB(RESOURCE_NAME);
    return posts.find(post => post.id === parseInt(id)) || null;
}

const createPost = async (data) => {
    const posts = await loadDB(RESOURCE_NAME);
    const postId = posts.length === 0 ? 1 : Math.max(...posts.map(post => post.id)) + 1;
    const newPost = {
        id: postId,
        title: data.title,
        content: data.content,
        createdAt: new Date().toISOString()
    }
    posts.push(newPost);
    await saveDB(RESOURCE_NAME, posts);
    return newPost;
}

const updatePost = async (data) => {
    const posts = await loadDB(RESOURCE_NAME);
    const postIndex = posts.findIndex(p => p.id === parseInt(data.id));
    if(postIndex !== -1) {
        posts[postIndex] = {
            ...posts[postIndex],
            title: data.title !== undefined ? data.title : posts[postIndex].title,
            content: data.content !== undefined ? data.content : posts[postIndex].content,
        }
        await saveDB(RESOURCE_NAME, posts);
    }
    return posts[postIndex] || null;
}

const deletePost = async (id) => {
    const posts = await loadDB(RESOURCE_NAME);
    const postIndex = posts.findIndex(p => p.id === parseInt(id));
    let deletedPost = null;
    if (postIndex !== -1) {
        deletedPost = posts.splice(postIndex, 1);
        await saveDB(RESOURCE_NAME, posts);
    }
    return deletedPost;
}

module.exports = {
    getAllPosts,
    getPostById,
    createPost,
    updatePost,
    deletePost
}