import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import {
  UploadCloud,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Settings,
  Tag,
  ArrowLeft,
} from "lucide-react";
import { API_URL } from "../lib/api";

export default function AdminCreatePost() {
  const [categories, setCategories] = useState([]); // Dynamic categories state
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "", // Will be set dynamically
    excerpt: "",
    imageAltText: "",
    metaTitle: "",
    metaDescription: "",
    tags: "",
  });

  const [content, setContent] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Fetch categories from your backend when the page loads
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_URL}/api/categories`);
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
          // Auto-select the first category if available
          if (data.length > 0) {
            setFormData((prev) => ({ ...prev, category: data[0].name }));
          }
        }
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e, status) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    // Generate a unique slug to prevent MongoDB duplicate errors
    const generatedSlug = formData.title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");
    const finalSlug = formData.slug || `${generatedSlug}-${Date.now()}`;

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("slug", finalSlug);
    submitData.append("content", content);
    submitData.append("excerpt", formData.excerpt);
    submitData.append("category", formData.category);
    submitData.append("imageAltText", formData.imageAltText);
    submitData.append("metaTitle", formData.metaTitle);
    submitData.append("metaDescription", formData.metaDescription);
    submitData.append("tags", JSON.stringify(tagsArray));
    submitData.append("status", status);
    submitData.append("readTime", "5 min read");

    if (imageFile) {
      submitData.append("coverImage", imageFile);
    }

    try {
      const response = await fetch(`${API_URL}/api/blogs`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: submitData,
      });

      if (response.ok) {
        setStatusMessage({
          type: "success",
          text: `Post successfully saved as ${status}!`,
        });
        // Clear form after success
        setFormData({
          ...formData,
          title: "",
          slug: "",
          excerpt: "",
          tags: "",
        });
        setContent("");
        setImageFile(null);
        setImagePreview(null);
      } else {
        const errorData = await response.json();
        setStatusMessage({
          type: "error",
          text: errorData.error || errorData.message || "Failed to save post.",
        });
      }
    } catch (error) {
      console.error("Publishing error:", error);
      setStatusMessage({
        type: "error",
        text: "Network error. Is the Node.js server running?",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const modules = {
    toolbar: [
      [{ header: [2, 3, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["link", "code-block", "image"],
      ["clean"],
    ],
  };

  return (
    <section className="w-full min-h-dvh pt-32 pb-24 bg-[#030712] font-jakarta">
      <style>
        {`
          .ql-toolbar.ql-snow { border-color: rgba(255,255,255,0.1) !important; background-color: #0a0f1c; border-top-left-radius: 1rem; border-top-right-radius: 1rem; }
          .ql-container.ql-snow { border-color: rgba(255,255,255,0.1) !important; background-color: #070b14; border-bottom-left-radius: 1rem; border-bottom-right-radius: 1rem; min-height: 600px; color: white; font-size: 16px; font-family: inherit; }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link
            to="/admin/dashboard"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-[#3b82f6] transition-colors font-bold text-sm tracking-wide"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div>
            <h2 className="text-[12px] font-black text-[#3b82f6] uppercase tracking-[0.2em] mb-4 m-0">
              CMS Dashboard
            </h2>
            <h2 className="text-4xl sm:text-5xl font-black text-white m-0 tracking-tighter">
              Create Content
            </h2>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={(e) => handleSubmit(e, "draft")}
              disabled={isSubmitting || !formData.title}
              className="px-6 py-3 rounded-xl bg-[#1e293b] text-white hover:bg-[#334155] transition-all font-bold tracking-wide disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={(e) => handleSubmit(e, "published")}
              disabled={isSubmitting || !formData.title}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-linear-to-r from-[#3b82f6] to-[#2563eb] text-white hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all font-bold tracking-wide shadow-lg disabled:opacity-50"
            >
              <UploadCloud className="w-5 h-5" />
              {isSubmitting ? "Saving..." : "Publish Live"}
            </button>
          </div>
        </div>

        {statusMessage && (
          <div
            className={`p-4 mb-8 rounded-xl flex items-center gap-3 ${statusMessage.type === "success" ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-red-500/10 text-red-500 border border-red-500/20"}`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <FileText className="w-5 h-5" />
            )}
            <h2 className="m-0 text-inherit text-[15px] font-bold">
              {statusMessage.text}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-[13px] font-bold tracking-wider uppercase">
                Post Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-[#0a0f1c] border border-white/5 rounded-xl py-4 px-5 text-white placeholder-slate-600 focus:outline-none focus:border-[#3b82f6] transition-all font-bold text-2xl"
                placeholder="Enter an engaging title..."
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-[13px] font-bold tracking-wider uppercase">
                Main Content
              </label>
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  placeholder="Start writing your masterpiece..."
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-[13px] font-bold tracking-wider uppercase">
                Short Excerpt
              </label>
              <textarea
                name="excerpt"
                rows="3"
                value={formData.excerpt}
                onChange={handleInputChange}
                className="w-full bg-[#0a0f1c] border border-white/5 rounded-xl py-4 px-5 text-white placeholder-slate-600 focus:outline-none focus:border-[#3b82f6] transition-all resize-none"
                placeholder="A brief summary for the blog feed..."
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="bg-[#0a0f1c] border border-white/5 rounded-2xl p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-[#3b82f6]" />
                <h2 className="m-0 text-white font-bold text-lg">
                  SEO & Structure
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-400 text-[12px] font-bold tracking-wider uppercase">
                  Custom Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full bg-[#030712] border border-white/5 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-[#3b82f6]"
                  placeholder="Leave blank to auto-generate"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-400 text-[12px] font-bold tracking-wider uppercase">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className="w-full bg-[#030712] border border-white/5 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-[#3b82f6]"
                  placeholder="SEO Title (Max 60 chars)"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-400 text-[12px] font-bold tracking-wider uppercase">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  rows="4"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  className="w-full bg-[#030712] border border-white/5 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-[#3b82f6] resize-none"
                  placeholder="SEO Description (Max 160 chars)"
                />
              </div>
            </div>

            <div className="bg-[#0a0f1c] border border-white/5 rounded-2xl p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="w-5 h-5 text-[#3b82f6]" />
                <h2 className="m-0 text-white font-bold text-lg">
                  Featured Media
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-400 text-[12px] font-bold tracking-wider uppercase">
                  Upload Cover Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-[#3b82f6]/10 file:text-[#3b82f6] hover:file:bg-[#3b82f6]/20 transition-all cursor-pointer"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 w-full h-40 object-cover rounded-lg border border-white/10"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-400 text-[12px] font-bold tracking-wider uppercase">
                  Image Alt Text
                </label>
                <input
                  type="text"
                  name="imageAltText"
                  value={formData.imageAltText}
                  onChange={handleInputChange}
                  className="w-full bg-[#030712] border border-white/5 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-[#3b82f6]"
                  placeholder="Describe image for accessibility"
                />
              </div>
            </div>

            <div className="bg-[#0a0f1c] border border-white/5 rounded-2xl p-6 flex flex-col gap-5">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-5 h-5 text-[#3b82f6]" />
                <h2 className="m-0 text-white font-bold text-lg">
                  Categorisation
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-400 text-[12px] font-bold tracking-wider uppercase">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-[#030712] border border-white/5 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-[#3b82f6] appearance-none"
                >
                  {categories.length > 0 ? (
                    categories.map((cat) => (
                      <option key={cat._id || cat.name} value={cat.name}>
                        {cat.name}
                      </option>
                    ))
                  ) : (
                    <option value="Uncategorized">Uncategorized</option>
                  )}
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-slate-400 text-[12px] font-bold tracking-wider uppercase">
                  Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full bg-[#030712] border border-white/5 rounded-lg py-3 px-4 text-white text-sm focus:outline-none focus:border-[#3b82f6]"
                  placeholder="react, web design, frontend"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
