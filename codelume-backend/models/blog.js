const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  content: { type: String, required: true },
  excerpt: { type: String },
  category: { type: String },
  imageAltText: { type: String },
  metaTitle: { type: String },
  metaDescription: { type: String },
  tags: [String],
  status: { type: String, default: 'draft' }, // 'published' or 'draft'
  readTime: { type: String },
  coverImage: { type: String }, // Cloudinary ka live URL yahan save hoga
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Blog', blogSchema);