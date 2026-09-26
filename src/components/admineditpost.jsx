import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  ArrowLeft,
  Save,
  Loader2,
  Image as ImageIcon,
  FileText,
  FolderOpen,
  LogOut,
} from "lucide-react";

export default function AdminEditPost() {
  const { id } = useParams();
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

  // Fetch Post Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const catRes = await fetch(`${API_BASE_URL}/api/categories`);
        if (catRes.ok) {
          const catData = await catRes.json();
          setCategories(catData);
        }

        const postRes = await fetch(`${API_BASE_URL}/api/blogs`);
        if (postRes.ok) {
          const allPosts = await postRes.json();
          const postData = allPosts.find((p) => p._id === id);

          if (postData) {
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
            alert("Post not found in database!");
            navigate("/admin/dashboard");
          }
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
        navigate("/admin/dashboard");
      } else {
        alert("Failed to update post.");
      }
    } catch (error) {
      console.error("Error updating post:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
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
    <div className="min-h-screen bg-[#030712] text-white flex font-jakarta pt-20">
      {/* ADMIN SIDEBAR - Exactly like Create Post & Dashboard */}
      <aside className="w-64 border-r border-white/5 hidden md:flex flex-col p-6 fixed h-full bg-[#030712] z-20">
        <div className="mb-10">
          <h2 className="text-2xl font-black text-white tracking-tighter m-0">
            CodeLume<span className="text-[#3b82f6]">.</span>
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
            Workspace
          </p>
        </div>

        <nav className="flex flex-col gap-2 grow">
          <Link
            to="/admin/dashboard"
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm text-slate-400 hover:bg-white/5 hover:text-white"
          >
            <FolderOpen size={18} /> Go to Dashboard
          </Link>
          <div className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm bg-[#3b82f6]/10 text-[#3b82f6]">
            <FileText size={18} /> Edit Post
          </div>
        </nav>

        <div className="pt-6 border-t border-white/5 mt-auto flex flex-col gap-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm text-red-400 hover:bg-red-500/10 hover:text-red-500"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      {/* MAIN EDITOR CONTENT */}
      <main className="flex-1 ml-0 md:ml-64 p-6 lg:p-10 relative z-10">
        <div className="max-w-4xl mx-auto">
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
              {isSaving ? "Saving..." : "Update Post"}
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

            {/* RAW HTML CONTENT AREA */}
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
              <h3 className="text-lg font-bold text-white mb-4">
                SEO Settings
              </h3>
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
      </main>
    </div>
  );
}
