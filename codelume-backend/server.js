require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import setups
const { upload } = require('./cloudinarySetup');
const Blog = require('./models/blog');

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Connected to Atlas Cloud!'))
  .catch(err => console.log('Database connection error:', err));

// --- CATEGORY SCHEMA ---
const categorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  count: { type: Number, default: 0 }
});
const Category = mongoose.model('Category', categorySchema);

// --- API ROUTES ---

// ADMIN LOGIN ROUTE
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'rafay123';

  if (username === adminUsername && password === adminPassword) {
    res.status(200).json({ message: 'Login successful', token: 'codelume-admin-auth-token-777' });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// UptimeRobot Keep-Awake Route
app.get('/', (req, res) => {
  res.status(200).send('CodeLume Backend is Awake and Running!');
});

// 1. CREATE A NEW BLOG POST
app.post('/api/blogs', upload.single('coverImage'), async (req, res) => {
  try {
    const { title, slug, content, excerpt, category, imageAltText, metaTitle, metaDescription, tags, status, readTime } = req.body;
    const coverImageUrl = req.file ? req.file.path : '';

    let parsedTags = [];
    if (tags) {
      try { parsedTags = JSON.parse(tags); } catch { parsedTags = tags.split(','); }
    }

    const newBlog = new Blog({
      title, slug, content, excerpt, category, imageAltText, metaTitle, metaDescription, tags: parsedTags, status, readTime, coverImage: coverImageUrl
    });

    await newBlog.save();
    res.status(201).json({ message: 'Blog post created successfully!', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Error saving post to database', error: error.message });
  }
});

// 2. GET ALL BLOG POSTS
app.get('/api/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts from database' });
  }
});

// 3. GET SINGLE BLOG POST BY SLUG
app.get('/api/blogs/:slug', async (req, res) => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) {
      return res.status(404).json({ message: 'Article not found' });
    }
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error fetching single blog:', error);
    res.status(500).json({ message: 'Error fetching the article', error: error.message });
  }
});

// ==========================================
// 4. UPDATE A BLOG POST (THE NEW FIX!)
// ==========================================
app.put('/api/blogs/:id', upload.single('coverImage'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, slug, content, excerpt, category, imageAltText, metaTitle, metaDescription, tags, status, existingCoverImage } = req.body;
    
    // Nayi image aayi hai toh wo use karein, warna purani wali use karein
    const coverImageUrl = req.file ? req.file.path : existingCoverImage;

    let parsedTags = [];
    if (tags) {
      try { parsedTags = JSON.parse(tags); } catch { parsedTags = tags.split(','); }
    }

    const updatedData = {
      title, slug, content, excerpt, category, imageAltText, metaTitle, metaDescription, tags: parsedTags, status, coverImage: coverImageUrl
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });

    if (!updatedBlog) {
      return res.status(404).json({ message: 'Post not found for update' });
    }

    res.status(200).json({ message: 'Blog post updated successfully!', blog: updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    res.status(500).json({ message: 'Error updating post in database', error: error.message });
  }
});
// ==========================================


// 5. DELETE A BLOG POST
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post successfully deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
});

// 6. UPLOAD IMAGE TO MEDIA LIBRARY
app.post('/api/media', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No image provided' });
    res.status(200).json({ url: req.file.path, message: 'Image uploaded successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error uploading image' });
  }
});

// 7. GET ALL CATEGORIES
app.get('/api/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// 8. CREATE A NEW CATEGORY
app.post('/api/categories', async (req, res) => {
  try {
    const newCat = new Category({ name: req.body.name, slug: req.body.slug });
    await newCat.save();
    res.status(201).json(newCat);
  } catch (error) {
    res.status(500).json({ message: 'Error saving category' });
  }
});

// 9. DELETE A CATEGORY
app.delete('/api/categories/:id', async (req, res) => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Category deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting category' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`CodeLume Backend API running on port ${PORT}`));