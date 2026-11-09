const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema(
  {
    blogSlug: { type: String, required: true, index: true },
    blogId: { type: mongoose.Schema.Types.ObjectId, ref: "Blog" },
    blogTitle: { type: String, default: "" },
    name: { type: String, required: true, trim: true, maxlength: 50 },
    email: { type: String, required: true, trim: true, lowercase: true },
    comment: { type: String, required: true, trim: true, maxlength: 2000 },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.models.Comment || mongoose.model("Comment", commentSchema);
