import express from 'express';
import Post from '../models/Post.js';
import authMiddleware from '../middleware/authMiddleware.js';

const router = express.Router();

// Create Post
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { text, image } = req.body;
    if (!text && !image) return res.status(400).json({ message: 'Post must contain text or an image URL' });

    const newPost = new Post({
      user: req.user.id,
      username: req.user.username,
      text,
      image
    });

    await newPost.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Fetch Feed (With basic pagination for bonus points) [cite: 57]
router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Like / Unlike Route [cite: 21]
router.put('/:id/like', authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.id || req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    const username = req.user.username;
    if (post.likes.includes(username)) {
      post.likes = post.likes.filter(name => name !== username); // Unlike
    } else {
      post.likes.push(username); // Like
    }

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Comment Route [cite: 21]
router.post('/:id/comment', authMiddleware, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ message: 'Comment cannot be empty' });

    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });

    post.comments.push({ username: req.user.username, text });
    await post.save();
    
    res.json(post);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;