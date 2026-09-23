const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const slugify = require('slugify');
const jwt = require('jsonwebtoken'); // 🚀 1. JWT Import kiya gaya hai
const Blog = require('./models/Blog');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/codelume_db')
  .then(() => console.log('MongoDB successfully connected'))
  .catch((err) => console.log('Database connection error:', err));

// ==========================================
// 🚀 2. SECURITY & LOGIN APIs (Naya Hissa)
// ==========================================

const JWT_SECRET = "codelume_super_secret_key_2026"; // Secret Key

// Admin Login API
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  // Yahan apna username aur password set karein
  if (username === 'rafay' && password === 'codelume123') {
    const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '1d' });
    res.status(200).json({ token });
  } else {
    res.status(401).json({ message: 'Invalid Username or Password' });
  }
});

// Security Middleware (API lock karne ke liye)
const verifyAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ message: 'Access Denied: No Token Provided' });

  const token = authHeader.split(" ")[1];
  try {
    jwt.verify(token, JWT_SECRET);
    next(); // Agar token theek hai toh aage janay do
  } catch (err) {
    res.status(401).json({ message: 'Invalid or Expired Token' });
  }
};

// ==========================================
// --- BLOG APIs ---
// ==========================================

// 1. Fetch All Blogs (Public - Koi bhi dekh sakta hai)
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({ isPublished: true }).sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// 2. Fetch Single Blog by Slug (Public)
app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server Error', error });
  }
});

// 3. Create New Blog (Protected - Sirf Admin post kar sakta hai)
// 🚀 FIX: Yahan 'verifyAdmin' middleware laga diya hai
app.post('/api/blogs', verifyAdmin, async (req, res) => {
  try {
    const { title, content, excerpt, category, coverImage, readTime } = req.body;
    const slug = slugify(title, { lower: true, strict: true });

    const newBlog = new Blog({
      title,
      slug,
      content,
      excerpt,
      category,
      coverImage,
      readTime
    });

    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Error creating blog', error });
  }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`CodeLume Backend API running on port ${PORT}`);
});