const express = require("express");
const router = express.Router();
const Category = require("../models/category");

// GET /api/categories - Frontend ke liye
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find().sort({ name: 1 });
    res.json(categories);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch categories" });
  }
});

// POST /api/categories - Nayi category banao
router.post("/", async (req, res) => {
  try {
    const { name, description } = req.body;
    const slug = name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const newCategory = new Category({ name, slug, description });
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (err) {
    if (err.code === 11000) return res.status(400).json({ error: "Category already exists" });
    res.status(500).json({ error: "Failed to create category" });
  }
});

module.exports = router;