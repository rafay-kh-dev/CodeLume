// API Route for creating a new blog post
router.post('/api/blogs', upload.single('coverImage'), async (req, res) => {
  try {
    // 1. Parse the tags array (because your frontend sends it as a JSON string via FormData)
    let parsedTags = [];
    if (req.body.tags) {
      try {
        parsedTags = JSON.parse(req.body.tags);
      } catch (err) {
        parsedTags = req.body.tags.split(','); // Fallback if it's just a comma-separated string
      }
    }

    // 2. Map all fields from req.body to the Mongoose Schema
    const newBlog = new Blog({
      title: req.body.title,
      slug: req.body.slug,
      content: req.body.content,
      excerpt: req.body.excerpt,
      category: req.body.category,
      imageAltText: req.body.imageAltText,
      
      // THESE ARE THE TWO CRITICAL LINES THAT FIX YOUR SEO ISSUE
      metaTitle: req.body.metaTitle,
      metaDescription: req.body.metaDescription,
      
      tags: parsedTags,
      status: req.body.status,
      readTime: req.body.readTime,
      
      // Handle the uploaded image (Assuming you are using Multer/Cloudinary)
      coverImage: req.file ? req.file.path : '' 
    });

    // 3. Save to MongoDB
    const savedBlog = await newBlog.save();
    
    // 4. Send success response back to React
    res.status(201).json(savedBlog);

  } catch (error) {
    console.error("Error creating blog:", error);
    
    // Handle specific MongoDB duplicate key errors (like duplicate slug)
    if (error.code === 11000) {
      return res.status(400).json({ error: "A post with this slug already exists." });
    }
    
    res.status(500).json({ error: "Failed to save post to the database." });
  }
});