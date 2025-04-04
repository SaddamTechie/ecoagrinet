const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {getPosts, createPost, updatePost, deletePost,likePost,addComment,likeComment} = require('../controllers/forumController');

router.get('/', getPosts);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.post('/:id/like', auth, likePost);
router.post('/:id/comment', auth, addComment);
router.post('/:postId/comment/:commentId/like', auth, likeComment);


module.exports = router;