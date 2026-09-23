// models/Blog.js
const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true
  },
  content: {
    type: String, // Yahan hum Admin portal se aane wala HTML format save karenge
    required: true
  },
  excerpt: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  coverImage: {
    type: String, // Image ka URL save hoga
    required: true
  },
  readTime: {
    type: String,
    default: "5 min read"
  },
  isPublished: {
    type: Boolean,
    default: true
  }
}, { timestamps: true }); // Timestamps automatically createdAt aur updatedAt date save karega

module.exports = mongoose.model('Blog', blogSchema);