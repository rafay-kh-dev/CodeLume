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
    type: String, 
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
    type: String, 
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
}, { timestamps: true }); 

module.exports = mongoose.model('Blog', blogSchema);