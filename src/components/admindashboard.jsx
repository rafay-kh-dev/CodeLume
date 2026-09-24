import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  FolderOpen,
  Image as ImageIcon,
  CalendarClock,
  Settings,
  Plus,
  Edit,
  Trash2,
  Search,
  LogOut,
  Link as LinkIcon,
  Type,
  UploadCloud,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("overview");
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");

  // Use Dynamic URL directly to avoid localhost issues
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "https://codelume-backend.onrender.com";

  // Fetch Live Data from MongoDB Backend
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        // 1. Fetch live posts
        const postResponse = await fetch(`${API_BASE_URL}/api/blogs`);
        if (postResponse.ok) {
          const postData = await postResponse.json();

          const formattedPosts = postData.map((post) => ({
            id: post._id,
            title: post.title,
            category: post.category || "Uncategorized",
            status: post.status === "published" ? "Published" : "Draft",
            date: new Date(post.createdAt).toLocaleDateString("en-AU", {
              day: "numeric",
              month: "short",
              year: "numeric",
            }),
          }));
          setPosts(formattedPosts);

          const extractedMedia = postData
            .filter((post) => post.coverImage)
            .map((post) => ({
              id: post._id,
              url: post.coverImage,
              alt: post.imageAltText || post.title,
            }));
          setMedia(extractedMedia);
        }

        // 2. Fetch live categories
        const catResponse = await fetch(`${API_BASE_URL}/api/categories`);
        if (catResponse.ok) {
          const catData = await catResponse.json();
          setCategories(
            catData.map((cat) => ({
              id: cat._id,
              name: cat.name,
              slug: cat.slug,
              count: cat.count || 0,
            })),
          );
        }
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [API_BASE_URL]);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin/login");
  };

  // Add Category to Database
  const handleAddCategory = async () => {
    if (!newCatName || !newCatSlug) {
      alert("Please fill in both the Name and Slug fields, mate!");
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: JSON.stringify({ name: newCatName, slug: newCatSlug }),
      });

      if (response.ok) {
        const savedCategory = await response.json();
        const newCategory = {
          id: savedCategory._id,
          name: savedCategory.name,
          slug: savedCategory.slug,
          count: 0,
        };
        setCategories([newCategory, ...categories]);
        setNewCatName("");
        setNewCatSlug("");
      } else {
        alert("Failed to save category to the database.");
      }
    } catch (error) {
      console.error("Error saving category:", error);
    }
  };

  // Delete Category from Database
  const handleDeleteCategory = async (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories/${id}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
          },
        });
        if (response.ok) {
          setCategories(categories.filter((cat) => cat.id !== id));
        }
      } catch (error) {
        console.error("Error deleting category:", error);
      }
    }
  };

  const handleDeletePost = async (id) => {
    if (
      window.confirm("Are you sure you want to delete this post permanently?")
    ) {
      try {
        const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
          method: "DELETE",
        });
        if (response.ok) {
          setPosts(posts.filter((post) => post.id !== id));
        } else {
          alert("Failed to delete the post from the database.");
        }
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch(`${API_BASE_URL}/api/media`, {
          method: "POST",
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          const newMediaItem = {
            id: Date.now().toString(),
            url: data.url,
            alt: "New Upload",
          };
          setMedia([newMediaItem, ...media]);
          alert("Image uploaded to Cloudinary successfully!");
        }
      } catch (error) {
        console.error("Media upload error:", error);
      }
    }
  };

  const copyMediaLink = (url) => {
    navigator.clipboard.writeText(url);
    alert("Cloudinary URL copied to clipboard! You can paste it anywhere.");
  };

  const handleEditAltText = (id, currentAlt) => {
    const newAlt = window.prompt(
      "Enter SEO Alt Text for this image:",
      currentAlt,
    );
    if (newAlt !== null) {
      setMedia(media.map((m) => (m.id === id ? { ...m, alt: newAlt } : m)));
    }
  };

  const handleDeleteMedia = (id) => {
    if (window.confirm("Remove this image from the dashboard view?")) {
      setMedia(media.filter((m) => m.id !== id));
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center text-white">
        <h2 className="text-xl font-bold animate-pulse">
          Loading live database...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-white flex font-jakarta pt-20">
      <aside className="w-64 border-r border-white/5 hidden md:flex flex-col p-6 fixed h-full">
        <div className="mb-10">
          <h2 className="text-2xl font-black text-white tracking-tighter m-0">
            CodeLume<span className="text-[#3b82f6]">.</span>
          </h2>
          <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mt-1">
            Workspace
          </p>
        </div>

        <nav className="flex flex-col gap-2 grow">
          <NavItem
            active={activeTab === "overview"}
            onClick={() => setActiveTab("overview")}
            icon={<LayoutDashboard size={18} />}
            label="Overview"
          />
          <NavItem
            active={activeTab === "posts"}
            onClick={() => setActiveTab("posts")}
            icon={<FileText size={18} />}
            label="All Posts"
          />
          <NavItem
            active={activeTab === "categories"}
            onClick={() => setActiveTab("categories")}
            icon={<FolderOpen size={18} />}
            label="Categories"
          />
          <NavItem
            active={activeTab === "media"}
            onClick={() => setActiveTab("media")}
            icon={<ImageIcon size={18} />}
            label="Media Library"
          />
          <NavItem
            active={activeTab === "scheduled"}
            onClick={() => setActiveTab("scheduled")}
            icon={<CalendarClock size={18} />}
            label="Scheduled"
          />
        </nav>

        <div className="pt-6 border-t border-white/5 mt-auto flex flex-col gap-2">
          <NavItem
            active={false}
            icon={<Settings size={18} />}
            label="Settings"
          />
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm text-red-400 hover:bg-red-500/10 hover:text-red-500"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-0 md:ml-64 p-6 lg:p-10">
        {activeTab === "overview" && (
          <div className="animate-in fade-in duration-500">
            <div className="mb-8">
              <h2 className="text-3xl font-black text-white m-0">
                Dashboard Overview
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Welcome back! Here is a summary of your site.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
              <div className="bg-[#0a0f1c] border border-white/5 p-6 rounded-2xl shadow-lg flex items-center gap-4">
                <div className="p-4 bg-[#3b82f6]/10 text-[#3b82f6] rounded-xl">
                  <FileText size={24} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                    Total Posts
                  </p>
                  <h2 className="text-3xl font-black text-white m-0">
                    {posts.length}
                  </h2>
                </div>
              </div>
              <div className="bg-[#0a0f1c] border border-white/5 p-6 rounded-2xl shadow-lg flex items-center gap-4">
                <div className="p-4 bg-purple-500/10 text-purple-500 rounded-xl">
                  <ImageIcon size={24} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                    Media Assets
                  </p>
                  <h2 className="text-3xl font-black text-white m-0">
                    {media.length}
                  </h2>
                </div>
              </div>
              <div className="bg-[#0a0f1c] border border-white/5 p-6 rounded-2xl shadow-lg flex items-center gap-4">
                <div className="p-4 bg-green-500/10 text-green-500 rounded-xl">
                  <FolderOpen size={24} />
                </div>
                <div>
                  <p className="text-slate-400 text-sm font-bold uppercase tracking-wider">
                    Categories
                  </p>
                  <h2 className="text-3xl font-black text-white m-0">
                    {categories.length}
                  </h2>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "posts" && (
          <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black text-white m-0">
                  All Posts
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Manage, edit, and organise your live content.
                </p>
              </div>
              <Link
                to="/admin/create-post"
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold transition-all shadow-lg"
              >
                <Plus size={18} /> Add New Post
              </Link>
            </div>

            <div className="bg-[#0a0f1c] border border-white/5 rounded-2xl overflow-hidden">
              <div className="p-4 border-b border-white/5 flex items-center justify-between">
                <div className="relative w-72">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search posts..."
                    className="w-full bg-[#030712] border border-white/5 rounded-lg py-2 pl-10 pr-4 text-sm text-white focus:outline-none focus:border-[#3b82f6]"
                  />
                </div>
              </div>

              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#030712] border-b border-white/5 text-slate-400 text-xs uppercase tracking-wider">
                    <th className="p-4 font-bold">Title</th>
                    <th className="p-4 font-bold">Category</th>
                    <th className="p-4 font-bold">Status</th>
                    <th className="p-4 font-bold">Date</th>
                    <th className="p-4 font-bold text-right">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map((post) => (
                    <tr
                      key={post.id}
                      className="border-b border-white/5 hover:bg-white/2 transition-colors group"
                    >
                      <td className="p-4">
                        <p className="font-bold text-white mb-1">
                          {post.title}
                        </p>
                        <p className="text-xs text-slate-500">
                          ID: {post.id.substring(0, 8)}...
                        </p>
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-slate-300">
                          {post.category}
                        </span>
                      </td>
                      <td className="p-4">
                        <StatusBadge status={post.status} />
                      </td>
                      <td className="p-4">
                        <span className="text-sm text-slate-300">
                          {post.date}
                        </span>
                      </td>
                      <td className="p-4 text-right">
                        <div className="flex justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                          <Link
                            to={`/admin/edit-post/${post.id}`}
                            className="text-slate-400 hover:text-[#3b82f6] transition-colors"
                          >
                            <Edit size={18} />
                          </Link>
                          <button
                            onClick={() => handleDeletePost(post.id)}
                            className="text-slate-400 hover:text-red-500 transition-colors"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {posts.length === 0 && (
                    <tr>
                      <td
                        colSpan="5"
                        className="p-8 text-center text-slate-500"
                      >
                        No posts found in MongoDB. Create your first post!
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === "categories" && (
          <div className="animate-in fade-in duration-500 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-[#0a0f1c] border border-white/5 rounded-2xl p-6">
                <h2 className="text-xl font-bold text-white mb-6">
                  Add New Category
                </h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                      Name
                    </label>
                    <input
                      type="text"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      placeholder="e.g. Artificial Intelligence"
                      className="w-full bg-[#030712] border border-white/5 rounded-lg py-3 px-4 text-white text-sm focus:border-[#3b82f6] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={newCatSlug}
                      onChange={(e) => setNewCatSlug(e.target.value)}
                      placeholder="artificial-intelligence"
                      className="w-full bg-[#030712] border border-white/5 rounded-lg py-3 px-4 text-white text-sm focus:border-[#3b82f6] outline-none"
                    />
                  </div>
                  <button
                    onClick={handleAddCategory}
                    className="w-full mt-2 bg-[#3b82f6] hover:bg-[#2563eb] text-white font-bold py-3 rounded-lg transition-colors"
                  >
                    Save Category
                  </button>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-[#0a0f1c] border border-white/5 rounded-2xl overflow-hidden">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#030712] border-b border-white/5 text-slate-400 text-xs uppercase tracking-wider">
                      <th className="p-4 font-bold">Name</th>
                      <th className="p-4 font-bold">Slug</th>
                      <th className="p-4 font-bold">Count</th>
                      <th className="p-4 font-bold text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => (
                      <tr
                        key={cat.id}
                        className="border-b border-white/5 hover:bg-white/2"
                      >
                        <td className="p-4 font-bold text-white">{cat.name}</td>
                        <td className="p-4 text-sm text-slate-400">
                          {cat.slug}
                        </td>
                        <td className="p-4 text-sm text-slate-300">
                          {cat.count} posts
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="text-slate-400 hover:text-red-500 ml-4 transition-colors"
                          >
                            <Trash2 size={16} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "media" && (
          <div className="animate-in fade-in duration-500">
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-3xl font-black text-white m-0">
                  Media Library
                </h2>
                <p className="text-slate-400 text-sm mt-1">
                  Images are pulled automatically from your live posts.
                </p>
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileUpload}
                className="hidden"
              />
              <button
                onClick={() => fileInputRef.current.click()}
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-linear-to-r from-[#3b82f6] to-[#2563eb] text-white font-bold transition-all shadow-lg"
              >
                <UploadCloud size={18} /> Upload Direct
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {media.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-square rounded-2xl overflow-hidden bg-[#0a0f1c] border border-white/5 flex flex-col shadow-lg"
                >
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <p className="text-xs text-slate-300 text-center mb-4 line-clamp-2">
                      Alt: {item.alt}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => copyMediaLink(item.url)}
                        title="Copy Link"
                        className="bg-[#1e293b] hover:bg-[#3b82f6] p-2.5 rounded-full text-white transition-colors"
                      >
                        <LinkIcon size={16} />
                      </button>
                      <button
                        onClick={() => handleEditAltText(item.id, item.alt)}
                        title="Edit Alt Text"
                        className="bg-[#1e293b] hover:bg-[#3b82f6] p-2.5 rounded-full text-white transition-colors"
                      >
                        <Type size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteMedia(item.id)}
                        title="Remove Image"
                        className="bg-[#1e293b] hover:bg-red-500 p-2.5 rounded-full text-white transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {media.length === 0 && (
              <p className="text-center text-slate-500 mt-10">
                No media found in your database. Publish a post with a cover
                image!
              </p>
            )}
          </div>
        )}
      </main>
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-semibold text-sm ${
        active
          ? "bg-[#3b82f6]/10 text-[#3b82f6]"
          : "text-slate-400 hover:bg-white/3 hover:text-white"
      }`}
    >
      {icon} {label}
    </button>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Published: "bg-green-500/10 text-green-500 border-green-500/20",
    Draft: "bg-slate-500/10 text-slate-400 border-slate-500/20",
    Scheduled: "bg-orange-500/10 text-orange-400 border-orange-500/20",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-bold rounded-full border ${styles[status] || styles.Draft}`}
    >
      {status}
    </span>
  );
}
