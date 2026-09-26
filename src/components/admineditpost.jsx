import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
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
  Save,
  Loader2,
} from "lucide-react";

export default function AdminEditPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const API_BASE_URL =
    import.meta.env.VITE_API_URL || "https://codelume-backend.onrender.com";

  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [categories, setCategories] = useState([]);

  // Form State matching the Create Post structure
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
    excerpt: "",
    imageAltText: "",
    metaTitle: "",
    metaDescription: "",
    tags: "",
    status: "draft",
  });

  const [content, setContent] = useState("");

  // For uploading a new image to replace the old one
  const [imageFile, setImageFile] = useState(null);
  // To show the currently active image
  const [imagePreview, setImagePreview] = useState(null);

  // 1. Fetch Categories and Specific Post Data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch Categories
        const catRes = await fetch(`${API_BASE_URL}/api/categories`);
        if (catRes.ok) {
          const catData = await catRes.json();
          const categoryArray = Array.isArray(catData)
            ? catData
            : catData.categories || [];
          const formattedCategories = categoryArray.map((cat) =>
            typeof cat === "string" ? { name: cat, _id: cat } : cat,
          );
          setCategories(formattedCategories);
        }

        // Fetch Specific Post via all blogs list (bypassing backend 404 issue)
        const postRes = await fetch(`${API_BASE_URL}/api/blogs`);
        if (postRes.ok) {
          const allPosts = await postRes.json();
          const postData = allPosts.find((p) => p._id === id);

          if (postData) {
            setFormData({
              title: postData.title || "",
              slug: postData.slug || "",
              category: postData.category || "",
              excerpt: postData.excerpt || "",
              imageAltText: postData.imageAltText || "",
              metaTitle: postData.metaTitle || "",
              metaDescription: postData.metaDescription || "",
              tags: postData.tags ? postData.tags.join(", ") : "",
              status: postData.status || "draft",
            });
            setContent(postData.content || "");
            if (postData.coverImage) {
              setImagePreview(postData.coverImage);
            }
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

  // Update Request (PUT method using FormData to support image uploads)
  const handleSubmit = async (e, updateStatus) => {
    e.preventDefault();
    setIsSaving(true);
    setStatusMessage(null);

    const currentStatus = updateStatus || formData.status;

    const tagsArray = formData.tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag !== "");

    const submitData = new FormData();
    submitData.append("title", formData.title);
    submitData.append("slug", formData.slug);
    submitData.append("content", content);
    submitData.append("excerpt", formData.excerpt);
    submitData.append("category", formData.category);
    submitData.append("imageAltText", formData.imageAltText);
    submitData.append("metaTitle", formData.metaTitle);
    submitData.append("metaDescription", formData.metaDescription);
    submitData.append("tags", JSON.stringify(tagsArray));
    submitData.append("status", currentStatus);

    if (imageFile) {
      submitData.append("coverImage", imageFile);
    } else if (imagePreview && !imagePreview.startsWith("blob:")) {
      submitData.append("existingCoverImage", imagePreview);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs/${id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        body: submitData,
      });

      if (response.ok) {
        setStatusMessage({
          type: "success",
          text: "Post updated successfully!",
        });
        setTimeout(() => {
          navigate("/admin/dashboard");
        }, 1500);
      } else {
        // SAFE ERROR HANDLING: Check if response is JSON or HTML Text
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const errorData = await response.json();
          setStatusMessage({
            type: "error",
            text:
              errorData.error || errorData.message || "Failed to update post.",
          });
        } else {
          // Agar HTML ya text aaye toh crash na ho
          const errorText = await response.text();
          console.error("Backend Error Text:", errorText);
          setStatusMessage({
            type: "error",
            text: `Server Error (${response.status}). Check backend terminal logs!`,
          });
        }
      }
    } catch (error) {
      console.error("Updating error catch block:", error);
      setStatusMessage({
        type: "error",
        text: `Error: ${error.message} - Backend might be rejecting FormData.`,
      });
    } finally {
      setIsSaving(false);
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

  if (isLoading) {
    return (
      <div className="w-full min-h-dvh flex items-center justify-center bg-[#030712] text-white">
        <h2 className="text-xl font-bold animate-pulse">Loading editor...</h2>
      </div>
    );
  }

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
              Edit Post
            </h2>
            <p className="text-slate-400 text-sm mt-2 font-medium">
              Currently editing: {formData.title}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={(e) => handleSubmit(e, "draft")}
              disabled={isSaving || !formData.title}
              className="px-6 py-3 rounded-xl bg-[#1e293b] text-white hover:bg-[#334155] transition-all font-bold tracking-wide disabled:opacity-50"
            >
              Save as Draft
            </button>
            <button
              onClick={(e) => handleSubmit(e, "published")}
              disabled={isSaving || !formData.title}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-linear-to-r from-[#3b82f6] to-[#2563eb] text-white hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all font-bold tracking-wide shadow-lg disabled:opacity-50"
            >
              {isSaving ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Save className="w-5 h-5" />
              )}
              {isSaving ? "Updating..." : "Update Post"}
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
                  Update Cover Image
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
