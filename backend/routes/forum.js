const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {getPosts, createPost} = require('../controllers/forumController');

router.get('/', getPosts);
router.post('/', auth, createPost);

module.exports = router;