require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import your new setups
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

// --- API ROUTES ---

// 1. CREATE A NEW BLOG POST
// upload.single('coverImage') intercepts the image file and sends it to Cloudinary first
app.post('/api/blogs', upload.single('coverImage'), async (req, res) => {
  try {
    const { title, slug, content, excerpt, category, imageAltText, metaTitle, metaDescription, tags, status, readTime } = req.body;

    // Get the permanent Cloudinary URL if an image was uploaded
    const coverImageUrl = req.file ? req.file.path : '';

    // Parse the tags array we sent from the frontend
    let parsedTags = [];
    if (tags) {
      try {
        parsedTags = JSON.parse(tags);
      } catch {
        parsedTags = tags.split(',');
      }
    }

    // Create a new post document for MongoDB
    const newBlog = new Blog({
      title,
      slug,
      content,
      excerpt,
      category,
      imageAltText,
      metaTitle,
      metaDescription,
      tags: parsedTags,
      status,
      readTime,
      coverImage: coverImageUrl
    });

    // Save permanently to Atlas
    await newBlog.save();
    res.status(201).json({ message: 'Blog post created successfully!', blog: newBlog });
    
  } catch (error) {
    console.error('Error creating blog:', error);
    res.status(500).json({ message: 'Error saving post to database', error: error.message });
  }
});

// 2. UPLOAD IMAGE TO MEDIA LIBRARY
app.post('/api/media', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'No image provided' });
    }
    // Return the Cloudinary URL back to the frontend
    res.status(200).json({ url: req.file.path, message: 'Image uploaded successfully' });
  } catch (error) {
    console.error('Media upload error:', error);
    res.status(500).json({ message: 'Error uploading image' });
  }
});

// 3. GET ALL BLOG POSTS (For Dashboard)
app.get('/api/blogs', async (req, res) => {
  try {
    // Fetches all posts from Atlas, sorting by newest first
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).json({ message: 'Error fetching posts from database' });
  }
});

// 4. DELETE A BLOG POST
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    await Blog.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Post successfully deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: 'Error deleting post' });
  }
});

// 5. ADMIN LOGIN ROUTE
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;

  // Use environment variables for security
  const adminUsername = process.env.ADMIN_USERNAME || 'admin';
  const adminPassword = process.env.ADMIN_PASSWORD || 'rafay123';

  if (username === adminUsername && password === adminPassword) {
    // Return a token to the frontend to allow access
    res.status(200).json({ 
      message: 'Login successful', 
      token: 'codelume-admin-auth-token-777' 
    });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`CodeLume Backend API running on port ${PORT}`));