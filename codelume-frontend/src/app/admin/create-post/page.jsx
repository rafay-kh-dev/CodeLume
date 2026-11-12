"use client";
import React, { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import {
  UploadCloud,
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Settings,
  Tag,
  ArrowLeft,
  Eye,
  X,
  Star,
} from "lucide-react";

// CRITICAL NEXT.JS FIX: React Quill requires the browser 'document' object.
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function AdminCreatePost() {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    category: "",
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

  // PRO 1 - Featured Post toggle (for Homepage Featured section)
  const [isFeatured, setIsFeatured] = useState(false);
  // PRO 2 - Preview modal
  const [showPreview, setShowPreview] = useState(false);

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

  // PRO 3 - Word Count + Auto Read Time (200 words = 1 min)
  const wordCount = useMemo(() => {
    const text = `${formData.title} ${content.replace(/<[^>]*>/g, " ")} ${formData.excerpt}`;
    const words = text
      .trim()
      .split(/\s+/)
      .filter((w) => w.length > 0);
    return text.trim() === "" ? 0 : words.length;
  }, [content, formData.title, formData.excerpt]);

  const readTime = useMemo(() => {
    const mins = Math.max(1, Math.ceil(wordCount / 200));
    return `${mins} min read`;
  }, [wordCount]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/categories`);
        if (!response.ok) {
          console.error("Server returned an error:", response.status);
          return;
        }
        const data = await response.json();
        const categoryArray = Array.isArray(data)
          ? data
          : data.categories || [];
        const formattedCategories = categoryArray.map((cat) =>
          typeof cat === "string" ? { name: cat, _id: cat } : cat,
        );
        setCategories(formattedCategories);
        if (formattedCategories.length > 0) {
          setFormData((prev) => ({
            ...prev,
            category: formattedCategories[0].name,
          }));
        }
      } catch (error) {
        console.error("Failed to fetch categories (Network Error):", error);
      }
    };
    fetchCategories();
  }, [API_BASE_URL]);

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
    // PRO - Auto-calculated read time, previously fixed at "5 min read"
    submitData.append("readTime", readTime);
    // PRO - Sending featured flag to backend
    submitData.append("isFeatured", isFeatured ? "true" : "false");

    if (imageFile) {
      submitData.append("coverImage", imageFile);
    }

    try {
      const response = await fetch(`${API_BASE_URL}/api/blogs`, {
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
        setIsFeatured(false);
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

  // NEW - Editor: Color + Ctrl+Shift Heading Shortcuts + Exact Format Paste
  const modules = useMemo(
    () => ({
      toolbar: [
        [{ header: [1, 2, 3, false] }],
        [{ color: [] }, { background: [] }],
        ["bold", "italic", "underline", "strike", "blockquote"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["link", "code-block", "image"],
        ["clean"],
      ],
      // Exact format paste - Word / Google Docs / Website se jaisa copy kiya waisa hi paste hoga
      // matchVisual: false = extra line breaks nahi add karega, original formatting rakhega
      clipboard: {
        matchVisual: false,
      },
      keyboard: {
        bindings: {
          // Ctrl + Shift + 1 = Heading 1 (shortKey = Ctrl on Windows, Cmd on Mac)
          header1: {
            key: "1",
            shortKey: true,
            shiftKey: true,
            handler: function (range) {
              this.quill.format("header", 1);
              return false;
            },
          },
          header2: {
            key: "2",
            shortKey: true,
            shiftKey: true,
            handler: function (range) {
              this.quill.format("header", 2);
              return false;
            },
          },
          header3: {
            key: "3",
            shortKey: true,
            shiftKey: true,
            handler: function (range) {
              this.quill.format("header", 3);
              return false;
            },
          },
          headerNormal: {
            key: "0",
            shortKey: true,
            shiftKey: true,
            handler: function (range) {
              this.quill.format("header", false);
              return false;
            },
          },
          // Backup - bina Shift ke bhi chal jaye: Ctrl + 1 / 2 / 3
          header1NoShift: {
            key: "1",
            shortKey: true,
            shiftKey: false,
            handler: function (range) {
              this.quill.format("header", 1);
              return false;
            },
          },
          header2NoShift: {
            key: "2",
            shortKey: true,
            shiftKey: false,
            handler: function (range) {
              this.quill.format("header", 2);
              return false;
            },
          },
          header3NoShift: {
            key: "3",
            shortKey: true,
            shiftKey: false,
            handler: function (range) {
              this.quill.format("header", 3);
              return false;
            },
          },
        },
      },
    }),
    [],
  );

  // NEW - Formats: color / background allow karna zaroori hai warna paste pe color strip ho jata hai
  const formats = useMemo(
    () => [
      "header",
      "color",
      "background",
      "bold",
      "italic",
      "underline",
      "strike",
      "blockquote",
      "list",
      "link",
      "code-block",
      "image",
    ],
    [],
  );

  return (
    <section className="w-full min-h-dvh pt-32 pb-24 bg-[#f8f8f8]">
      <style>
        {`
          .ql-toolbar.ql-snow { border-color: #e5e7eb !important; background-color: #ffffff; border-top-left-radius: 1rem; border-top-right-radius: 1rem; }
          .ql-container.ql-snow { border-color: #e5e7eb !important; background-color: #ffffff; border-bottom-left-radius: 1rem; border-bottom-right-radius: 1rem; min-height: 600px; color: #000000; font-size: 16px; font-family: inherit; }
          .ql-editor.ql-blank::before { color: #9ca3af !important; }
          .preview-content h1 { font-size: 32px; font-weight: 800; color: #000; margin: 24px 0 12px; }
          .preview-content h2 { font-size: 26px; font-weight: 700; color: #000; margin: 24px 0 12px; }
          .preview-content h3 { font-size: 20px; font-weight: 700; color: #000; margin: 20px 0 10px; }
          .preview-content p { font-size: 16px; line-height: 1.8; color: #374151; margin: 0 0 16px; }
          .preview-content ul, .preview-content ol { margin: 0 0 16px 20px; color: #374151; line-height: 1.8; }
          .preview-content blockquote { border-left: 4px solid #4285F4; padding-left: 16px; color: #6b7280; margin: 16px 0; }
          .preview-content a { color: #4285F4; text-decoration: underline; }
          .preview-content img { border-radius: 12px; margin: 16px 0; max-width: 100%; }
        `}
      </style>

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="mb-8">
          <Link
            href="/admin/dashboard"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-[#4285F4] transition-colors font-medium text-sm tracking-wide"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </Link>
        </div>

        <div className="mb-10 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
          <div>
            <h2 className="text- font-bold text-[#4285F4] uppercase tracking-[0.2em] mb-4 m-0">
              CMS Dashboard
            </h2>
            <h2 className="text-4xl sm:text-5xl font-bold text-black m-0 tracking-tight">
              Create Content
            </h2>
            {/* PRO - Live Word Count + Read Time */}
            <p className="text-gray-500 text-sm mt-3 font-medium">
              {wordCount} words • {readTime}
              {isFeatured && (
                <span className="ml-2 inline-flex items-center gap-1 bg-[#4285F4]/10 text-[#4285F4] px-2 py-0.5 rounded-full text- font-bold">
                  <Star className="w-3 h-3 fill-[#4285F4]" /> Featured
                </span>
              )}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            {/* PRO - Preview Button */}
            <button
              type="button"
              onClick={() => setShowPreview(true)}
              disabled={!formData.title && !content}
              className="flex items-center gap-2 px-6 py-3 rounded-xl bg-white border border-gray-200 text-black hover:border-[#4285F4] hover:text-[#4285F4] transition-all font-medium tracking-wide disabled:opacity-50 cursor-pointer"
            >
              <Eye className="w-5 h-5" /> Preview
            </button>
            <button
              onClick={(e) => handleSubmit(e, "draft")}
              disabled={isSubmitting || !formData.title}
              className="px-6 py-3 rounded-xl bg-gray-100 text-black hover:bg-gray-200 transition-all font-medium tracking-wide disabled:opacity-50"
            >
              Save Draft
            </button>
            <button
              onClick={(e) => handleSubmit(e, "published")}
              disabled={isSubmitting || !formData.title}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#4285F4] hover:bg-[#3367d6] text-white transition-all font-medium tracking-wide shadow-sm disabled:opacity-50"
            >
              <UploadCloud className="w-5 h-5" />
              {isSubmitting ? "Saving..." : "Publish Live"}
            </button>
          </div>
        </div>

        {statusMessage && (
          <div
            className={`p-4 mb-8 rounded-xl flex items-center gap-3 ${statusMessage.type === "success" ? "bg-green-50 text-green-600 border border-green-200" : "bg-red-50 text-red-500 border border-red-200"}`}
          >
            {statusMessage.type === "success" ? (
              <CheckCircle2 className="w-5 h-5" />
            ) : (
              <FileText className="w-5 h-5" />
            )}
            <h2 className="m-0 text-inherit text- font-medium">
              {statusMessage.text}
            </h2>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="flex flex-col gap-2">
              <label className="text-gray-500 text- font-medium tracking-wider uppercase">
                Post Title
              </label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-200 rounded-xl py-4 px-5 text-black placeholder-gray-400 focus:outline-none focus:border-[#4285F4] transition-all font-bold text-2xl"
                placeholder="Enter an engaging title..."
              />
              <p className="text- text-gray-400 m-0">
                {formData.title.length} characters • 50-60 characters is best
                for SEO
              </p>
            </div>

            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-gray-500 text- font-medium tracking-wider uppercase">
                  Main Content
                </label>
                <span className="text- font-medium text-gray-400">
                  {wordCount} words • {readTime}
                </span>
              </div>
              <div className="rounded-xl overflow-hidden shadow-sm">
                <ReactQuill
                  theme="snow"
                  value={content}
                  onChange={setContent}
                  modules={modules}
                  formats={formats}
                  placeholder="Start writing your masterpiece..."
                />
              </div>
              {/* NEW - Shortcut hints */}
              <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text- text-gray-400">
                <span>
                  <b className="text-gray-600 font-semibold">Ctrl+Shift+1</b> =
                  Heading 1
                </span>
                <span>
                  <b className="text-gray-600 font-semibold">Ctrl+Shift+2</b> =
                  Heading 2
                </span>
                <span>
                  <b className="text-gray-600 font-semibold">Ctrl+Shift+3</b> =
                  Heading 3
                </span>
                <span>
                  <b className="text-gray-600 font-semibold">Ctrl+Shift+0</b> =
                  Normal
                </span>
                <span>
                  <b className="text-gray-600 font-semibold">Ctrl+V</b> = Exact
                  Format Paste
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-500 text- font-medium tracking-wider uppercase">
                Short Excerpt
              </label>
              <textarea
                name="excerpt"
                rows="3"
                value={formData.excerpt}
                onChange={handleInputChange}
                className="w-full bg-white border border-gray-200 rounded-xl py-4 px-5 text-black placeholder-gray-400 focus:outline-none focus:border-[#4285F4] transition-all resize-none"
                placeholder="A brief summary for the blog feed..."
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
            {/* PRO - Post Settings: Featured Toggle */}
            <div className="bg-white border border-gray-200 rounded- p-6 flex flex-col gap-4 shadow-sm">
              <div className="flex items-center gap-2">
                <Star className="w-5 h-5 text-[#4285F4]" />
                <h2 className="m-0 text-black font-bold text-lg">
                  Post Settings
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setIsFeatured(!isFeatured)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border text-left transition-all cursor-pointer ${
                  isFeatured
                    ? "bg-[#4285F4]/10 border-[#4285F4]/30"
                    : "bg-gray-50 border-gray-200 hover:border-gray-300"
                }`}
              >
                <span>
                  <span className="block text- font-bold text-black">
                    ⭐ Featured Post
                  </span>
                  <span className="block text- text-gray-500 mt-0.5">
                    Will appear in Featured on the homepage
                  </span>
                </span>
                <span
                  className={`w-11 h-6 rounded-full p-0.5 flex shrink-0 transition-colors ${isFeatured ? "bg-[#4285F4] justify-end" : "bg-gray-300 justify-start"}`}
                >
                  <span className="w-5 h-5 bg-white rounded-full shadow-sm block" />
                </span>
              </button>
              <p className="text- text-gray-400 m-0 leading-relaxed">
                Keep only 1-2 posts featured to preserve its value.
              </p>
            </div>

            <div className="bg-white border border-gray-200 rounded- p-6 flex flex-col gap-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Settings className="w-5 h-5 text-[#4285F4]" />
                <h2 className="m-0 text-black font-bold text-lg">
                  SEO & Structure
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-500 text- font-medium tracking-wider uppercase">
                  Custom Slug
                </label>
                <input
                  type="text"
                  name="slug"
                  value={formData.slug}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black text-sm placeholder-gray-400 focus:outline-none focus:border-[#4285F4]"
                  placeholder="Leave blank to auto-generate"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-500 text- font-medium tracking-wider uppercase">
                  Meta Title • {formData.metaTitle.length} / 60
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black text-sm placeholder-gray-400 focus:outline-none focus:border-[#4285F4]"
                  placeholder="SEO Title (Max 60 chars)"
                />
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${formData.metaTitle.length > 60 ? "bg-red-500" : "bg-[#4285F4]"}`}
                    style={{
                      width: `${Math.min(100, (formData.metaTitle.length / 60) * 100)}%`,
                    }}
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-500 text- font-medium tracking-wider uppercase">
                  Meta Description • {formData.metaDescription.length} / 160
                </label>
                <textarea
                  name="metaDescription"
                  rows="4"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black text-sm placeholder-gray-400 focus:outline-none focus:border-[#4285F4] resize-none"
                  placeholder="SEO Description (Max 160 chars)"
                />
                <div className="h-1 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${formData.metaDescription.length > 160 ? "bg-red-500" : "bg-[#4285F4]"}`}
                    style={{
                      width: `${Math.min(100, (formData.metaDescription.length / 160) * 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded- p-6 flex flex-col gap-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <ImageIcon className="w-5 h-5 text-[#4285F4]" />
                <h2 className="m-0 text-black font-bold text-lg">
                  Featured Media
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-500 text- font-medium tracking-wider uppercase">
                  Upload Cover Image
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#4285F4]/10 file:text-[#4285F4] hover:file:bg-[#4285F4]/20 transition-all cursor-pointer"
                />
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="mt-4 w-full h-40 object-cover rounded-lg border border-gray-200"
                  />
                )}
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-500 text- font-medium tracking-wider uppercase">
                  Image Alt Text
                </label>
                <input
                  type="text"
                  name="imageAltText"
                  value={formData.imageAltText}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black text-sm placeholder-gray-400 focus:outline-none focus:border-[#4285F4]"
                  placeholder="Describe image for accessibility"
                />
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded- p-6 flex flex-col gap-5 shadow-sm">
              <div className="flex items-center gap-2 mb-2">
                <Tag className="w-5 h-5 text-[#4285F4]" />
                <h2 className="m-0 text-black font-bold text-lg">
                  Categorisation
                </h2>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-500 text- font-medium tracking-wider uppercase">
                  Category
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black text-sm focus:outline-none focus:border-[#4285F4] appearance-none"
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
                <label className="text-gray-500 text- font-medium tracking-wider uppercase">
                  Tags (Comma Separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black text-sm placeholder-gray-400 focus:outline-none focus:border-[#4285F4]"
                  placeholder="react, web design, frontend"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* PRO - Preview Modal */}
      {showPreview && (
        <div
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 sm:p-6 overflow-y-auto"
          onClick={() => setShowPreview(false)}
        >
          <div
            className="bg-white w-full max-w- rounded- overflow-hidden shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-100">
              <span className="text- font-bold text-gray-500 uppercase tracking-wider">
                Preview • How your blog will look
              </span>
              <button
                onClick={() => setShowPreview(false)}
                className="w-8 h-8 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 sm:p-8">
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt={formData.imageAltText || formData.title}
                  className="w-full h- object-cover rounded- mb-6"
                />
              )}
              <div className="flex items-center gap-2 mb-3">
                <span className="bg-[#4285F4]/10 text-[#4285F4] text- font-bold px-3 py-1 rounded-full">
                  {formData.category || "Uncategorized"}
                </span>
                <span className="text- text-gray-400 font-medium">
                  {readTime}
                </span>
                {isFeatured && (
                  <span className="bg-[#4285F4] text-white text- font-bold px-3 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" /> Featured
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-black tracking-tight m-0 leading-tight">
                {formData.title || "Your Title Here..."}
              </h1>
              {formData.excerpt && (
                <p className="text- text-gray-500 leading-relaxed mt-4">
                  {formData.excerpt}
                </p>
              )}
              <div className="flex items-center gap-3 mt-6 pb-6 border-b border-gray-100">
                <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center font-bold text-sm">
                  R
                </div>
                <div>
                  <p className="text- font-bold text-black m-0">
                    Rafay • Rafay's CodeLume
                  </p>
                  <p className="text- text-gray-400 m-0">
                    Just now • {wordCount} words
                  </p>
                </div>
              </div>
              <div
                className="preview-content mt-6"
                dangerouslySetInnerHTML={{
                  __html:
                    content ||
                    "<p class='text-gray-400'>Your content will appear here...</p>",
                }}
              />
              {formData.tags && (
                <div className="flex flex-wrap gap-2 mt-8 pt-6 border-t border-gray-100">
                  {formData.tags.split(",").map((t, i) => (
                    <span
                      key={i}
                      className="bg-gray-100 text-gray-600 text- font-medium px-3 py-1 rounded-full"
                    >
                      #{t.trim()}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-100 flex gap-3">
              <button
                onClick={() => setShowPreview(false)}
                className="flex-1 py-3 rounded-full bg-gray-100 font-medium text-black hover:bg-gray-200 cursor-pointer"
              >
                Continue Editing
              </button>
              <button
                onClick={(e) => {
                  setShowPreview(false);
                  handleSubmit(e, "published");
                }}
                className="flex-1 py-3 rounded-full bg-[#4285F4] font-medium text-white hover:bg-[#3367d6] cursor-pointer"
              >
                Publish Live
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
