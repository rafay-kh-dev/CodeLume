"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";
import {
  CheckCircle2,
  FileText,
  Image as ImageIcon,
  Settings,
  Tag,
  ArrowLeft,
  Save,
  Loader2,
} from "lucide-react";

// CRITICAL NEXT.JS FIX: React Quill requires the browser 'document' object.
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function AdminEditPost() {
  const { id } = useParams();
  const router = useRouter();
  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

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
            router.push("/admin/dashboard");
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id, API_BASE_URL, router]);

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
          router.push("/admin/dashboard");
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

  // NEW - Editor: Color + Ctrl+Shift Heading Shortcuts + Exact Format Paste (Same as Create Post)
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

  if (isLoading) {
    return (
      <div className="w-full min-h-dvh flex items-center justify-center bg-[#f8f8f8] text-black">
        <h2 className="text-xl font-bold animate-pulse">Loading editor...</h2>
      </div>
    );
  }

  return (
    <section className="w-full min-h-dvh pt-32 pb-24 bg-[#f8f8f8]">
      <style>
        {`
          .ql-toolbar.ql-snow { border-color: #e5e7eb !important; background-color: #ffffff; border-top-left-radius: 1rem; border-top-right-radius: 1rem; }
          .ql-container.ql-snow { border-color: #e5e7eb !important; background-color: #ffffff; border-bottom-left-radius: 1rem; border-bottom-right-radius: 1rem; min-height: 600px; color: #000000; font-size: 16px; font-family: inherit; }
          .ql-editor.ql-blank::before { color: #9ca3af !important; }
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
              Edit Post
            </h2>
            <p className="text-gray-500 text-sm mt-2 font-medium">
              Currently editing: {formData.title}
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <button
              onClick={(e) => handleSubmit(e, "draft")}
              disabled={isSaving || !formData.title}
              className="px-6 py-3 rounded-xl bg-gray-100 text-black hover:bg-gray-200 transition-all font-medium tracking-wide disabled:opacity-50"
            >
              Save as Draft
            </button>
            <button
              onClick={(e) => handleSubmit(e, "published")}
              disabled={isSaving || !formData.title}
              className="flex items-center gap-2 px-8 py-3 rounded-xl bg-[#4285F4] hover:bg-[#3367d6] text-white transition-all font-medium tracking-wide shadow-sm disabled:opacity-50"
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
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-gray-500 text- font-medium tracking-wider uppercase">
                Main Content
              </label>
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
              />
            </div>
          </div>

          <div className="flex flex-col gap-8">
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
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-500 text- font-medium tracking-wider uppercase">
                  Meta Title
                </label>
                <input
                  type="text"
                  name="metaTitle"
                  value={formData.metaTitle}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black text-sm placeholder-gray-400 focus:outline-none focus:border-[#4285F4]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-gray-500 text- font-medium tracking-wider uppercase">
                  Meta Description
                </label>
                <textarea
                  name="metaDescription"
                  rows="4"
                  value={formData.metaDescription}
                  onChange={handleInputChange}
                  className="w-full bg-white border border-gray-200 rounded-lg py-3 px-4 text-black text-sm placeholder-gray-400 focus:outline-none focus:border-[#4285F4] resize-none"
                />
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
                  Update Cover Image
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
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
