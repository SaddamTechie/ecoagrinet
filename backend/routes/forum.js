const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {getPosts, createPost, updatePost, deletePost} = require('../controllers/forumController');

router.get('/', getPosts);
router.post('/', auth, createPost);
router.put('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);

module.exports = router;