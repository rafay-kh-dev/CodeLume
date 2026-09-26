import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Save, Loader2, Image as ImageIcon } from "lucide-react";

export default function AdminEditPost() {
  const { id } = useParams(); // URL se post ka ID nikalne ke liye
  const navigate = useNavigate();
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "https://codelume-backend.onrender.com";

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [categories, setCategories] = useState([]);

  // Form State
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    content: "",
    category: "",
    status: "draft",
    coverImage: "",
    metaTitle: "",
    metaDescription: "",
  });

  // Fetch Post Data aur Categories
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Categories fetch karein (Dropdown ke liye)
        const catRes = await fetch(`${API_BASE_URL}/api/categories`);
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData);
        }

        // Specific Post ka data fetch karein
        const postRes = await fetch(`${API_BASE_URL}/api/blogs/${id}`);
        if (postRes.ok) {
          const postData = await postRes.json();
          setFormData({
            title: postData.title || "",
            slug: postData.slug || "",
            content: postData.content || "",
            category: postData.category || "",
            status: postData.status || "draft",
            coverImage: postData.coverImage || "",
            metaTitle: postData.metaTitle || "",
            metaDescription: postData.metaDescription || "",
          });
        } else {
          alert("Post not found!");
          navigate("/admin/dashboard");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, API_BASE_URL, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Update Request (PUT method)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("Post updated successfully!");
        navigate("/admin/dashboard"); // Update hone ke baad wapas dashboard par bhej dein
      } else {
        alert("Failed to update post.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">
        <h2 className="text-xl font-bold animate-pulse">
          Loading post details...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white font-jakarta p-6 lg:p-10 pt-24">
      <div className="max-w-5xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/admin/dashboard")}
              className="p-2 bg-white/5 hover:bg-white/10 rounded-full transition-colors outline-none"
            >
              <ArrowLeft className="w-5 h-5 text-slate-300" />
            </button>
            <div>
              <h1 className="text-2xl sm:text-3xl font-black m-0 text-white tracking-tight">
                Edit Post
              </h1>
              <p className="text-slate-400 text-sm mt-1 m-0">
                Editing: {formData.title}
              </p>
            </div>
          </div>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="flex items-center justify-center gap-2 bg-linear-to-r from-[#3b82f6] to-[#2563eb] hover:from-[#2563eb] hover:to-[#1d4ed8] px-6 py-3 rounded-xl font-bold transition-all shadow-lg disabled:opacity-70 outline-none"
          >
            {isSaving ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <Save className="w-5 h-5" />
            )}
            {isSaving ? "Saving Changes..." : "Update Post"}
          </button>
        </div>

        {/* Editor Form */}
        <div className="bg-[#0a0f1c] border border-white/5 rounded-3xl p-6 md:p-8 space-y-6 shadow-2xl">
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
              Post Title
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full bg-[#030712] border border-white/5 rounded-xl py-3 px-4 text-white focus:border-[#3b82f6] outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full bg-[#030712] border border-white/5 rounded-xl py-3 px-4 text-white focus:border-[#3b82f6] outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((c) => (
                  <option key={c._id} value={c.name}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full bg-[#030712] border border-white/5 rounded-xl py-3 px-4 text-white focus:border-[#3b82f6] outline-none"
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
                <option value="scheduled">Scheduled</option>
              </select>
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
              Cover Image URL
            </label>
            <div className="flex gap-3">
              <div className="w-12 h-12 shrink-0 bg-[#030712] border border-white/5 rounded-xl flex items-center justify-center overflow-hidden">
                {formData.coverImage ? (
                  <img
                    src={formData.coverImage}
                    alt="Cover"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <ImageIcon className="w-5 h-5 text-slate-500" />
                )}
              </div>
              <input
                type="text"
                name="coverImage"
                value={formData.coverImage}
                onChange={handleChange}
                placeholder="https://..."
                className="w-full bg-[#030712] border border-white/5 rounded-xl py-3 px-4 text-white focus:border-[#3b82f6] outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
              Content
            </label>
            <textarea
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="12"
              className="w-full bg-[#030712] border border-white/5 rounded-xl py-4 px-4 text-white text-[15px] leading-relaxed focus:border-[#3b82f6] outline-none resize-y"
            ></textarea>
          </div>

          <div className="pt-6 border-t border-white/5">
            <h3 className="text-lg font-bold text-white mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleChange}
                  className="w-full bg-[#030712] border border-white/5 rounded-xl py-3 px-4 text-white focus:border-[#3b82f6] outline-none"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  value={formData.metaDescription}
                  onChange={handleChange}
                  rows="3"
                  className="w-full bg-[#030712] border border-white/5 rounded-xl py-3 px-4 text-white focus:border-[#3b82f6] outline-none resize-none"
                ></textarea>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
