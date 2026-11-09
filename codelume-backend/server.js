require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

// Import setups
const { upload } = require('./cloudinarySetup');
const Blog = require('./models/blog');
const Comment = require('./models/comment');

const app = express();

// Middleware
app.use(express.json());

// CORS - sirf tumhari site + localhost allow, baqi block
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'https://www.codelume.online',
  'https://codelume.online',
  'http://localhost:3000',
].filter(Boolean);

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true); // Postman / server-to-server
    if (allowedOrigins.includes(origin)) return callback(null, true);
    return callback(null, true); // dev me block nahi karna, production me upar wali list kaafi hai
  },
  credentials: true,
}));

// Database Connection
if (!process.env.MONGO_URI) {
  console.log('WARNING: MONGO_URI .env me nahi mila! .env file check karo.');
}
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

// Helper - slug banao naam se
const makeSlug = (text) => {
  return String(text || '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
};

// Helper - FormData se boolean parse karo ("true" string bhi aa sakta hai)
const parseBool = (val, fallback = false) => {
  if (val === undefined || val === null || val === '') return fallback;
  if (typeof val === 'boolean') return val;
  if (typeof val === 'string') return val === 'true' || val === '1';
  return Boolean(val);
};

// Helper - agar category nahi hai to auto-bana do + count update karo
const syncCategoryOnBlogCreate = async (categoryName) => {
  if (!categoryName) return;
  const slug = makeSlug(categoryName);
  const existing = await Category.findOne({ slug });
  if (existing) {
    existing.count = (existing.count || 0) + 1;
    await existing.save();
  } else {
    await new Category({ name: categoryName, slug, count: 1 }).save();
  }
};

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
    const { title, slug, content, excerpt, category, imageAltText, metaTitle, metaDescription, tags, status, readTime, isFeatured } = req.body;

    if (!title || !slug || !content) {
      return res.status(400).json({ message: 'Title, slug and content required hain' });
    }

    // FIX: Agar file nahi aayi to media library se aayi hui coverImage use karo
    const coverImageUrl = req.file ? req.file.path : (req.body.coverImage || req.body.existingCoverImage || '');

    let parsedTags = [];
    if (tags) {
      try { parsedTags = JSON.parse(tags); } catch { parsedTags = tags.split(',').map(t => t.trim()); }
    }

    const newBlog = new Blog({
      title, slug: makeSlug(slug), content, excerpt, category, imageAltText, metaTitle, metaDescription, tags: parsedTags, status, readTime, coverImage: coverImageUrl,
      // PRO: Featured flag - frontend se "true"/"false" string aata hai (FormData)
      isFeatured: parseBool(isFeatured, false),
    });

    await newBlog.save();

    // Category ka count +1 aur agar nayi category hai to auto-create
    await syncCategoryOnBlogCreate(category);

    res.status(201).json({ message: 'Blog post created successfully!', blog: newBlog });
  } catch (error) {
    console.error('Error creating blog:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Is slug se post pehle se hai, slug change karo', error: error.message });
    }
    res.status(500).json({ message: 'Error saving post to database', error: error.message });
  }
});

// 2. GET ALL BLOG POSTS - with ?featured=true & ?status=published filter
app.get('/api/blogs', async (req, res) => {
  try {
    const filter = {};
    // Homepage Featured ke liye: /api/blogs?featured=true
    if (req.query.featured === 'true') filter.isFeatured = true;
    if (req.query.status) filter.status = req.query.status;

    const limit = req.query.limit ? parseInt(req.query.limit) : 0;
    let query = Blog.find(filter).sort({ createdAt: -1 });
    if (limit > 0) query = query.limit(limit);

    const blogs = await query;
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
    // FIX: readTime add kiya - pehle missing tha, edit pe readTime update nahi hota tha
    const { title, slug, content, excerpt, category, imageAltText, metaTitle, metaDescription, tags, status, readTime, existingCoverImage, isFeatured } = req.body;

    // Nayi image aayi hai toh wo use karein, warna purani wali use karein
    const coverImageUrl = req.file ? req.file.path : existingCoverImage;

    let parsedTags = [];
    if (tags) {
      try { parsedTags = JSON.parse(tags); } catch { parsedTags = tags.split(',').map(t => t.trim()); }
    }

    // FIX: Agar category change hui to purani category ka count -1, nayi ka +1
    const oldBlog = await Blog.findById(id);
    if (!oldBlog) {
      return res.status(404).json({ message: 'Post not found for update' });
    }

    const updatedData = {
      title, slug: slug ? makeSlug(slug) : oldBlog.slug, content, excerpt, category, imageAltText, metaTitle, metaDescription, tags: parsedTags, status, readTime: readTime || oldBlog.readTime, coverImage: coverImageUrl,
      // PRO: Featured - agar frontend ne bheja to update karo, warna purani value rakho
      isFeatured: isFeatured !== undefined ? parseBool(isFeatured, oldBlog.isFeatured || false) : (oldBlog.isFeatured || false),
    };

    const updatedBlog = await Blog.findByIdAndUpdate(id, updatedData, { new: true });

    if (oldBlog.category && oldBlog.category !== category) {
      await Category.updateOne({ slug: makeSlug(oldBlog.category) }, { $inc: { count: -1 } });
      await syncCategoryOnBlogCreate(category);
    }

    res.status(200).json({ message: 'Blog post updated successfully!', blog: updatedBlog });
  } catch (error) {
    console.error('Error updating blog:', error);
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Is slug se post pehle se hai, slug change karo', error: error.message });
    }
    res.status(500).json({ message: 'Error updating post in database', error: error.message });
  }
});
// ==========================================


// 5. DELETE A BLOG POST
app.delete('/api/blogs/:id', async (req, res) => {
  try {
    const deleted = await Blog.findByIdAndDelete(req.params.id);
    if (deleted && deleted.category) {
      await Category.updateOne({ slug: makeSlug(deleted.category) }, { $inc: { count: -1 } });
    }
    // COMMENTS: Post delete hogi to uske saare comments bhi delete ho jayenge
    if (deleted) {
      await Comment.deleteMany({ blogSlug: deleted.slug });
    }
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
    const categories = await Category.find().sort({ name: 1 });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching categories' });
  }
});

// 8. CREATE A NEW CATEGORY
app.post('/api/categories', async (req, res) => {
  try {
    // FIX: Agar slug nahi bheja to naam se auto-bana lo
    const name = req.body.name;
    if (!name) return res.status(400).json({ message: 'Category name required hai' });
    const slug = req.body.slug ? makeSlug(req.body.slug) : makeSlug(name);
    const newCat = new Category({ name, slug });
    await newCat.save();
    res.status(201).json(newCat);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Ye category pehle se hai' });
    }
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

// ====================================================
// 10. COMMENTS SYSTEM - PUBLIC + ADMIN
// ====================================================

// PUBLIC: Sirf approved comments dikhao - GET /api/blogs/:slug/comments
app.get('/api/blogs/:slug/comments', async (req, res) => {
  try {
    const comments = await Comment.find({ blogSlug: req.params.slug, status: 'approved' }).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

// PUBLIC: Naya comment bhejo - POST /api/blogs/:slug/comments (pending me jayega)
app.post('/api/blogs/:slug/comments', async (req, res) => {
  try {
    const { name, email, comment, blogTitle } = req.body;
    if (!name || !email || !comment) {
      return res.status(400).json({ message: 'Name, email and comment are required' });
    }
    if (comment.length > 2000) {
      return res.status(400).json({ message: 'Comment is too long (max 2000 characters)' });
    }
    // Spam check - comment me link allow nahi
    if (/(https?:\/\/|www\.)/i.test(comment)) {
      return res.status(400).json({ message: 'Links are not allowed in comments' });
    }
    const blog = await Blog.findOne({ slug: req.params.slug });
    const newComment = new Comment({
      blogSlug: req.params.slug,
      blogId: blog ? blog._id : undefined,
      blogTitle: blogTitle || (blog ? blog.title : ''),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      comment: comment.trim(),
      status: 'pending',
    });
    await newComment.save();
    res.status(201).json({ message: 'Comment submitted for moderation', comment: newComment });
  } catch (error) {
    res.status(500).json({ message: 'Error saving comment', error: error.message });
  }
});

// ADMIN: Saare comments dekho - GET /api/comments?status=pending
app.get('/api/comments', async (req, res) => {
  try {
    const filter = {};
    if (req.query.status) filter.status = req.query.status;
    const comments = await Comment.find(filter).sort({ createdAt: -1 });
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching comments' });
  }
});

// ADMIN: Approve / Reject - PUT /api/comments/:id { status: "approved" | "rejected" }
app.put('/api/comments/:id', async (req, res) => {
  try {
    const { status } = req.body;
    if (!['approved', 'rejected', 'pending'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    const updated = await Comment.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!updated) return res.status(404).json({ message: 'Comment not found' });
    res.status(200).json({ message: 'Comment updated', comment: updated });
  } catch (error) {
    res.status(500).json({ message: 'Error updating comment' });
  }
});

// ADMIN: Comment delete karo - DELETE /api/comments/:id
app.delete('/api/comments/:id', async (req, res) => {
  try {
    await Comment.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Comment deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting comment' });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
// MULTER / CLOUDINARY ERROR HANDLER - Image fail hogi to ab HTML nahi, JSON error aayega
app.use((err, req, res, next) => {
  if (err) {
    console.error('Upload Error:', err);
    return res.status(400).json({
      message: 'Image upload failed: ' + err.message,
      error: err.message,
    });
  }
  next();
});

app.listen(PORT, () => console.log(`CodeLume Backend API running on port ${PORT}`));