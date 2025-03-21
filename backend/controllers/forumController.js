const Post = require('../models/Post');

const getPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate('user', 'name').populate('comments.user', 'name');
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const createPost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = new Post({ user: req.user.id, title, content });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const updatePost = async (req, res) => {
  const { title, content } = req.body;
  try {
    let post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
    post.title = title || post.title;
    post.content = content || post.content;
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.user.toString() !== req.user.id) return res.status(403).json({ msg: 'Unauthorized' });
    await post.deleteOne();
    res.json({ msg: 'Post deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    if (post.likes.includes(req.user.id)) {
      post.likes = post.likes.filter(id => id.toString() !== req.user.id);
    } else {
      post.likes.push(req.user.id);
    }
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const addComment = async (req, res) => {
  const { content } = req.body;
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    post.comments.push({ user: req.user.id, content });
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

const likeComment = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    if (!post) return res.status(404).json({ msg: 'Post not found' });
    const comment = post.comments.id(req.params.commentId);
    if (!comment) return res.status(404).json({ msg: 'Comment not found' });
    if (comment.likes.includes(req.user.id)) {
      comment.likes = comment.likes.filter(id => id.toString() !== req.user.id);
    } else {
      comment.likes.push(req.user.id);
    }
    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


module.exports = {
    getPosts,
    createPost,
    updatePost,
    deletePost,
    likePost,
    addComment,
    likeComment
}