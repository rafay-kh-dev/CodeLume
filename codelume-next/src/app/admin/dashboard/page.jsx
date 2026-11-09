"use client";
import React, { useState, useEffect, useRef, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FileText,
  FolderOpen,
  Image as ImageIcon,
  Plus,
  Edit,
  Trash2,
  Search,
  LogOut,
  Link as LinkIcon,
  Type,
  UploadCloud,
  Eye,
  Star,
  RotateCcw,
  LayoutDashboard,
  CheckCircle2,
  X,
} from "lucide-react";

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState("posts");
  const router = useRouter();
  const fileInputRef = useRef(null);

  const [posts, setPosts] = useState([]);
  const [rawPosts, setRawPosts] = useState([]);
  const [prevStatusMap, setPrevStatusMap] = useState({});
  const [categories, setCategories] = useState([]);
  const [media, setMedia] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const [newCatName, setNewCatName] = useState("");
  const [newCatSlug, setNewCatSlug] = useState("");

  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [featuredOnly, setFeaturedOnly] = useState(false);
  const [showTrashConfirm, setShowTrashConfirm] = useState(null);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://codelume-rb3h.onrender.com";

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      router.push("/admin/login");
      return;
    }
  }, [router]);

  const stats = useMemo(() => {
    const total = posts.length;
    const published = posts.filter((p) => p.status === "Published").length;
    const drafts = posts.filter((p) => p.status === "Draft").length;
    const featured = posts.filter((p) => p.isFeatured).length;
    const trash = posts.filter((p) => p.status === "Trash").length;
    return { total, published, drafts, featured, trash };
  }, [posts]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setIsLoading(true);
        const postResponse = await fetch(`${API_BASE_URL}/api/blogs`);
        let postData = [];
        if (postResponse.ok) {
          postData = await postResponse.json();
          setRawPosts(postData);
          const formattedPosts = postData.map((post) => ({
            id: post._id,
            title: post.title,
            slug: post.slug,
            category: post.category || "Uncategorized",
            coverImage: post.coverImage || "",
            isFeatured: post.isFeatured === true || post.isFeatured === "true",
            readTime: post.readTime || "1 min read",
            status:
              post.status === "published"
                ? "Published"
                : post.status === "scheduled"
                  ? "Scheduled"
                  : post.status === "trash"
                    ? "Trash"
                    : "Draft",
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
        const catResponse = await fetch(`${API_BASE_URL}/api/categories`);
        if (catResponse.ok) {
          const catData = await catResponse.json();
          setCategories(
            catData.map((cat) => {
              const postCount = postData.filter(
                (p) => p.category === cat.name,
              ).length;
              return {
                id: cat._id,
                name: cat.name,
                slug: cat.slug,
                count: postCount,
              };
            }),
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
    router.push("/admin/login");
  };

  const handleAddCategory = async () => {
    if (!newCatName || !newCatSlug) {
      alert("Please fill in both the Name and Slug fields.");
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

  const updatePostStatus = async (id, newStatus, isFeaturedOverride = null) => {
    const raw = rawPosts.find((p) => p._id === id);
    if (!raw) return false;
    const fd = new FormData();
    fd.append("title", raw.title || "");
    fd.append("slug", raw.slug || "");
    fd.append("content", raw.content || "");
    fd.append("excerpt", raw.excerpt || "");
    fd.append("category", raw.category || "");
    fd.append("imageAltText", raw.imageAltText || "");
    fd.append("metaTitle", raw.metaTitle || "");
    fd.append("metaDescription", raw.metaDescription || "");
    fd.append("tags", JSON.stringify(raw.tags || []));
    fd.append("status", newStatus);
    fd.append("readTime", raw.readTime || "1 min read");
    fd.append("existingCoverImage", raw.coverImage || "");
    const finalFeatured =
      isFeaturedOverride !== null
        ? isFeaturedOverride
        : raw.isFeatured === true || raw.isFeatured === "true";
    fd.append("isFeatured", finalFeatured ? "true" : "false");
    const res = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
      },
      body: fd,
    });
    if (!res.ok) return false;
    const data = await res.json();
    setRawPosts((prev) => prev.map((p) => (p._id === id ? data.blog : p)));
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        return {
          ...p,
          status:
            newStatus === "published"
              ? "Published"
              : newStatus === "trash"
                ? "Trash"
                : newStatus === "scheduled"
                  ? "Scheduled"
                  : "Draft",
          isFeatured: finalFeatured,
        };
      }),
    );
    return true;
  };

  const handleMoveToTrash = async (id) => {
    const post = posts.find((p) => p.id === id);
    if (post) setPrevStatusMap((prev) => ({ ...prev, [id]: post.status }));
    const ok = await updatePostStatus(id, "trash");
    if (!ok) alert("Failed to move post to trash.");
    setShowTrashConfirm(null);
  };

  const handleRestorePost = async (id) => {
    const prevStatus = prevStatusMap[id] || "Draft";
    const restoreTo =
      prevStatus === "Published"
        ? "published"
        : prevStatus === "Scheduled"
          ? "scheduled"
          : "draft";
    const ok = await updatePostStatus(id, restoreTo);
    if (!ok) alert("Failed to restore post.");
  };

  const handlePermanentDelete = async (id) => {
    if (!window.confirm("Permanently delete this post? This cannot be undone."))
      return;
    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
      if (response.ok) {
        const updatedPosts = posts.filter((post) => post.id !== id);
        setPosts(updatedPosts);
        setRawPosts((prev) => prev.filter((p) => p._id !== id));
        setCategories(
          categories.map((cat) => ({
            ...cat,
            count: updatedPosts.filter((p) => p.category === cat.name).length,
          })),
        );
      } else {
        alert("Failed to delete the post from the database.");
      }
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEmptyTrash = async () => {
    if (
      !window.confirm(
        "Delete all posts in Trash permanently? This cannot be undone.",
      )
    )
      return;
    const trashIds = posts.filter((p) => p.status === "Trash").map((p) => p.id);
    for (const id of trashIds) {
      await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
      });
    }
    const remaining = posts.filter((p) => p.status !== "Trash");
    setPosts(remaining);
    setRawPosts((prev) => prev.filter((p) => !trashIds.includes(p._id)));
  };

  const handleToggleFeatured = async (id) => {
    const post = posts.find((p) => p.id === id);
    if (!post) return;
    const newFeatured = !post.isFeatured;
    const statusMap = {
      Published: "published",
      Draft: "draft",
      Scheduled: "scheduled",
      Trash: "trash",
    };
    const ok = await updatePostStatus(
      id,
      statusMap[post.status] || "draft",
      newFeatured,
    );
    if (!ok) alert("Failed to update featured status.");
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

  const filteredPosts = posts.filter((post) => {
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "All" || post.status === statusFilter;
    const matchesFeatured = !featuredOnly || post.isFeatured;
    return matchesSearch && matchesStatus && matchesFeatured;
  });

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f8f8f8] flex items-center justify-center text-black">
        <h2 className="text-xl font-bold animate-pulse">
          Loading live database...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8f8f8] text-black flex pt-20">
      <aside className="w-64 border-r border-gray-200 bg-white hidden md:flex flex-col p-6 fixed h-full">
        <div className="mb-10">
          <h2 className="text-2xl font-bold text-black tracking-tight m-0">
            CodeLume<span className="text-[#4285F4]">.</span>
          </h2>
          <p className="text-gray-400 text-xs font-medium uppercase tracking-widest mt-1">
            Workspace
          </p>
        </div>
        <nav className="flex flex-col gap-2 grow">
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
        </nav>
        <div className="pt-6 border-t border-gray-100 mt-auto flex flex-col gap-2">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm text-red-500 hover:bg-red-50"
          >
            <LogOut size={18} /> Logout
          </button>
        </div>
      </aside>

      <main className="flex-1 ml-0 md:ml-64 p-4 sm:p-6 lg:p-10">
        <div className="md:hidden flex gap-2 overflow-x-auto pb-2 mb-4 hide-scrollbar">
          {[
            { key: "posts", label: "All Posts", icon: <FileText size={16} /> },
            {
              key: "categories",
              label: "Categories",
              icon: <FolderOpen size={16} />,
            },
            { key: "media", label: "Media", icon: <ImageIcon size={16} /> },
          ].map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-[13px] font-medium whitespace-nowrap border ${activeTab === tab.key ? "bg-[#4285F4] text-white border-[#4285F4]" : "bg-white text-gray-600 border-gray-200"}`}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {activeTab === "posts" && (
          <div className="animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4 mb-6">
              <div>
                <h2 className="text-3xl font-bold text-black m-0">All Posts</h2>
                <p className="text-gray-500 text-sm mt-1">
                  Manage, edit, and organise your live content.
                </p>
              </div>
              <Link
                href="/admin/create-post"
                className="flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-[#4285F4] hover:bg-[#3367d6] text-white font-medium transition-all shadow-sm shrink-0"
              >
                <Plus size={18} /> Add New Post
              </Link>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 mb-6">
              <button
                onClick={() => {
                  setStatusFilter("All");
                  setFeaturedOnly(false);
                }}
                className="bg-white border border-gray-200 rounded-[16px] p-4 sm:p-5 text-left hover:border-[#4285F4]/40 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <LayoutDashboard className="w-4 h-4 text-[#4285F4]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Total Posts
                  </span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-black m-0">
                  {stats.total}
                </p>
                <p className="text-[12px] text-gray-400 m-0 mt-1">
                  All posts in database
                </p>
              </button>
              <button
                onClick={() => {
                  setStatusFilter("Published");
                  setFeaturedOnly(false);
                }}
                className="bg-white border border-gray-200 rounded-[16px] p-4 sm:p-5 text-left hover:border-green-300 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-4 h-4 text-green-600" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Published
                  </span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-black m-0">
                  {stats.published}
                </p>
                <p className="text-[12px] text-gray-400 m-0 mt-1">
                  Live on website
                </p>
              </button>
              <button
                onClick={() => {
                  setStatusFilter("Draft");
                  setFeaturedOnly(false);
                }}
                className="bg-white border border-gray-200 rounded-[16px] p-4 sm:p-5 text-left hover:border-gray-300 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <FileText className="w-4 h-4 text-gray-500" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Drafts
                  </span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-black m-0">
                  {stats.drafts}
                </p>
                <p className="text-[12px] text-gray-400 m-0 mt-1">
                  Not published yet
                </p>
              </button>
              <button
                onClick={() => {
                  setStatusFilter("All");
                  setFeaturedOnly(true);
                }}
                className="bg-white border border-gray-200 rounded-[16px] p-4 sm:p-5 text-left hover:border-[#4285F4]/40 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Star className="w-4 h-4 text-[#4285F4] fill-[#4285F4]" />
                  <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400">
                    Featured
                  </span>
                </div>
                <p className="text-2xl sm:text-3xl font-bold text-black m-0">
                  {stats.featured}
                </p>
                <p className="text-[12px] text-gray-400 m-0 mt-1">
                  Homepage featured
                </p>
              </button>
            </div>

            {statusFilter === "Trash" && stats.trash > 0 && (
              <div className="bg-red-50 border border-red-200 rounded-[16px] p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <p className="text-[14px] text-red-600 font-medium m-0">
                  {stats.trash} post(s) in Trash. Restore them or delete
                  permanently.
                </p>
                <button
                  onClick={handleEmptyTrash}
                  className="px-4 py-2 rounded-full bg-red-500 hover:bg-red-600 text-white text-[13px] font-medium shrink-0 cursor-pointer"
                >
                  Empty Trash
                </button>
              </div>
            )}

            <div className="bg-white border border-gray-200 rounded-[20px] overflow-hidden flex flex-col shadow-sm">
              <div className="p-4 border-b border-gray-100 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
                  {["All", "Published", "Draft", "Scheduled", "Trash"].map(
                    (status) => {
                      const count =
                        status === "All"
                          ? stats.total
                          : status === "Published"
                            ? stats.published
                            : status === "Draft"
                              ? stats.drafts
                              : status === "Trash"
                                ? stats.trash
                                : posts.filter((p) => p.status === status)
                                    .length;
                      return (
                        <button
                          key={status}
                          onClick={() => setStatusFilter(status)}
                          className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all ${statusFilter === status ? "bg-[#4285F4] text-white" : "bg-gray-100 text-gray-500 hover:bg-gray-200 hover:text-black"}`}
                        >
                          {status} ({count})
                        </button>
                      );
                    },
                  )}
                  <button
                    onClick={() => setFeaturedOnly(!featuredOnly)}
                    className={`px-4 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-all flex items-center gap-1 ${featuredOnly ? "bg-[#4285F4] text-white" : "bg-[#4285F4]/10 text-[#4285F4] hover:bg-[#4285F4]/20"}`}
                  >
                    <Star
                      size={12}
                      className={featuredOnly ? "fill-white" : "fill-[#4285F4]"}
                    />{" "}
                    Featured Only
                  </button>
                </div>
                <div className="relative w-full lg:w-72 shrink-0">
                  <Search
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search posts..."
                    className="w-full bg-white border border-gray-200 rounded-lg py-2 pl-10 pr-4 text-sm text-black placeholder-gray-400 focus:outline-none focus:border-[#4285F4]"
                  />
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse min-w-[720px]">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="p-4 font-medium">Post</th>
                      <th className="p-4 font-medium">Category</th>
                      <th className="p-4 font-medium">Status</th>
                      <th className="p-4 font-medium">Date</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredPosts.map((post) => (
                      <tr
                        key={post.id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors group"
                      >
                        <td className="p-4">
                          <div className="flex items-start gap-3">
                            {post.coverImage ? (
                              <img
                                src={post.coverImage}
                                alt={post.title}
                                className="w-14 h-14 rounded-lg object-cover border border-gray-200 shrink-0"
                              />
                            ) : (
                              <div className="w-14 h-14 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                <FileText className="w-5 h-5 text-gray-300" />
                              </div>
                            )}
                            <div className="min-w-0">
                              <p className="font-medium text-black mb-1 leading-snug line-clamp-2">
                                {post.title}
                              </p>
                              <p className="text-xs text-gray-400 m-0">
                                {post.readTime} • ID: {post.id.substring(0, 8)}
                                ...
                              </p>
                              {post.isFeatured && (
                                <span className="inline-flex items-center gap-1 bg-[#4285F4]/10 text-[#4285F4] text-[11px] font-bold px-2 py-0.5 rounded-full mt-1.5">
                                  <Star className="w-3 h-3 fill-[#4285F4]" />{" "}
                                  Featured
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-gray-600">
                            {post.category}
                          </span>
                        </td>
                        <td className="p-4">
                          <StatusBadge status={post.status} />
                        </td>
                        <td className="p-4">
                          <span className="text-sm text-gray-600">
                            {post.date}
                          </span>
                        </td>
                        <td className="p-4 text-right">
                          <div className="flex justify-end gap-1">
                            {post.status === "Trash" ? (
                              <>
                                <button
                                  onClick={() => handleRestorePost(post.id)}
                                  title="Restore"
                                  className="p-2 rounded-full text-gray-400 hover:text-green-600 hover:bg-green-50 transition-colors cursor-pointer"
                                >
                                  <RotateCcw size={18} />
                                </button>
                                <button
                                  onClick={() => handlePermanentDelete(post.id)}
                                  title="Delete Permanently"
                                  className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  onClick={() => handleToggleFeatured(post.id)}
                                  title={
                                    post.isFeatured
                                      ? "Remove from Featured"
                                      : "Make Featured"
                                  }
                                  className={`p-2 rounded-full transition-colors cursor-pointer ${post.isFeatured ? "text-[#4285F4] bg-[#4285F4]/10" : "text-gray-400 hover:text-[#4285F4] hover:bg-[#4285F4]/10"}`}
                                >
                                  <Star
                                    size={18}
                                    className={
                                      post.isFeatured ? "fill-[#4285F4]" : ""
                                    }
                                  />
                                </button>
                                <Link
                                  href={`/blogs/${post.slug}`}
                                  target="_blank"
                                  title="View Live"
                                  className="p-2 rounded-full text-gray-400 hover:text-[#4285F4] hover:bg-[#4285F4]/10 transition-colors inline-flex"
                                >
                                  <Eye size={18} />
                                </Link>
                                <Link
                                  href={`/admin/edit-post/${post.id}`}
                                  className="p-2 rounded-full text-gray-400 hover:text-[#4285F4] transition-colors inline-flex"
                                >
                                  <Edit size={18} />
                                </Link>
                                <button
                                  onClick={() => setShowTrashConfirm(post.id)}
                                  title="Move to Trash"
                                  className="p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors cursor-pointer"
                                >
                                  <Trash2 size={18} />
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                    {filteredPosts.length === 0 && (
                      <tr>
                        <td
                          colSpan="5"
                          className="p-8 text-center text-gray-400"
                        >
                          {posts.length === 0
                            ? "No posts found in MongoDB. Create your first post!"
                            : statusFilter === "Trash"
                              ? "Trash is empty. Deleted posts will appear here."
                              : "No posts match your selected filter or search."}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === "categories" && (
          <div className="animate-in fade-in duration-500 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="bg-white border border-gray-200 rounded-[20px] p-6 shadow-sm">
                <h2 className="text-xl font-bold text-black mb-6">
                  Add New Category
                </h2>
                <div className="flex flex-col gap-4">
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                      Name
                    </label>
                    <input
                      type="text"
                      value={newCatName}
                      onChange={(e) => setNewCatName(e.target.value)}
                      placeholder="e.g. Artificial Intelligence"
                      className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black text-sm placeholder-gray-400 focus:border-[#4285F4] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-2 block">
                      Slug
                    </label>
                    <input
                      type="text"
                      value={newCatSlug}
                      onChange={(e) => setNewCatSlug(e.target.value)}
                      placeholder="artificial-intelligence"
                      className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black text-sm placeholder-gray-400 focus:border-[#4285F4] outline-none"
                    />
                  </div>
                  <button
                    onClick={handleAddCategory}
                    className="w-full mt-2 bg-[#4285F4] hover:bg-[#3367d6] text-white font-medium py-3 rounded-lg transition-colors"
                  >
                    Save Category
                  </button>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <div className="bg-white border border-gray-200 rounded-[20px] overflow-hidden shadow-sm">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 border-b border-gray-100 text-gray-500 text-xs uppercase tracking-wider">
                      <th className="p-4 font-medium">Name</th>
                      <th className="p-4 font-medium">Slug</th>
                      <th className="p-4 font-medium">Count</th>
                      <th className="p-4 font-medium text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map((cat) => (
                      <tr
                        key={cat.id}
                        className="border-b border-gray-100 hover:bg-gray-50"
                      >
                        <td className="p-4 font-medium text-black">
                          {cat.name}
                        </td>
                        <td className="p-4 text-sm text-gray-500">
                          {cat.slug}
                        </td>
                        <td className="p-4 text-sm text-gray-600">
                          {cat.count} posts
                        </td>
                        <td className="p-4 text-right">
                          <button
                            onClick={() => handleDeleteCategory(cat.id)}
                            className="text-gray-400 hover:text-red-500 ml-4 transition-colors"
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
                <h2 className="text-3xl font-bold text-black m-0">
                  Media Library
                </h2>
                <p className="text-gray-500 text-sm mt-1">
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
                className="flex items-center gap-2 px-6 py-3 rounded-xl bg-[#4285F4] hover:bg-[#3367d6] text-white font-medium transition-all shadow-sm"
              >
                <UploadCloud size={18} /> Upload Direct
              </button>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {media.map((item) => (
                <div
                  key={item.id}
                  className="group relative aspect-square rounded-[20px] overflow-hidden bg-white border border-gray-200 flex flex-col shadow-sm"
                >
                  <img
                    src={item.url}
                    alt={item.alt}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-4">
                    <p className="text-xs text-white/80 text-center mb-4 line-clamp-2">
                      Alt: {item.alt}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      <button
                        onClick={() => copyMediaLink(item.url)}
                        title="Copy Link"
                        className="bg-white hover:bg-[#4285F4] hover:text-white p-2.5 rounded-full text-black transition-colors"
                      >
                        <LinkIcon size={16} />
                      </button>
                      <button
                        onClick={() => handleEditAltText(item.id, item.alt)}
                        title="Edit Alt Text"
                        className="bg-white hover:bg-[#4285F4] hover:text-white p-2.5 rounded-full text-black transition-colors"
                      >
                        <Type size={16} />
                      </button>
                      <button
                        onClick={() => handleDeleteMedia(item.id)}
                        title="Remove Image"
                        className="bg-white hover:bg-red-500 hover:text-white p-2.5 rounded-full text-black transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {media.length === 0 && (
              <p className="text-center text-gray-400 mt-10">
                No media found in your database. Publish a post with a cover
                image!
              </p>
            )}
          </div>
        )}
      </main>

      {showTrashConfirm && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setShowTrashConfirm(null)}
        >
          <div
            className="bg-white w-full max-w-[420px] rounded-[20px] p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center mb-4">
              <Trash2 className="w-6 h-6 text-red-500" />
            </div>
            <h3 className="text-xl font-bold text-black m-0">Move to Trash?</h3>
            <p className="text-[14px] text-gray-500 mt-2 leading-relaxed">
              This post will move to Trash. You can restore it anytime or delete
              it permanently from Trash.
            </p>
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setShowTrashConfirm(null)}
                className="flex-1 py-3 rounded-full bg-gray-100 font-medium text-black hover:bg-gray-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <X size={16} /> Cancel
              </button>
              <button
                onClick={() => handleMoveToTrash(showTrashConfirm)}
                className="flex-1 py-3 rounded-full bg-red-500 font-medium text-white hover:bg-red-600 cursor-pointer"
              >
                Move to Trash
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm ${active ? "bg-[#4285F4]/10 text-[#4285F4]" : "text-gray-500 hover:bg-gray-100 hover:text-black"}`}
    >
      {icon} {label}
    </button>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Published: "bg-green-50 text-green-600 border-green-200",
    Draft: "bg-gray-100 text-gray-500 border-gray-200",
    Scheduled: "bg-orange-50 text-orange-500 border-orange-200",
    Trash: "bg-red-50 text-red-500 border-red-200",
  };
  return (
    <span
      className={`px-3 py-1 text-xs font-medium rounded-full border ${styles[status] || styles.Draft}`}
    >
      {status}
    </span>
  );
}
