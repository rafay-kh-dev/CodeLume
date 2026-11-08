const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    excerpt: { type: String, default: "" },
    category: { type: String, required: true, trim: true },
    imageAltText: { type: String, default: "" },
    metaTitle: { type: String, default: "" },
    metaDescription: { type: String, default: "" },
    tags: { type: [String], default: [] },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    readTime: { type: String, default: "5 min read" },
    coverImage: { type: String, default: "" },
  },
  { timestamps: true }
);

// Model dobara banane se bachne ke liye - warna "Cannot overwrite model" aayega
module.exports = mongoose.models.Blog || mongoose.model("Blog", blogSchema);
