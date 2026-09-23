import React, { useState } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import { Save, UploadCloud, FileText, CheckCircle2 } from "lucide-react";

export default function AdminCreatePost() {
  const [formData, setFormData] = useState({
    title: "",
    category: "Development",
    readTime: "5 min read",
    coverImage: "",
    excerpt: "",
  });
  
  // ReactQuill ke liye content alag state mein rakhte hain
  const [content, setContent] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handlePublish = async (e) => {
    e.preventDefault();
    setIsPublishing(true);
    setStatusMessage(null);

    const postData = {
      ...formData,
      content,
    };

    try {
      // 🚀 NAYA: Token ko fetch call mein attach kar diya
      const response = await fetch("http://localhost:5000/api/blogs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("adminToken")}` // Yeh line sab se zaroori hai!
        },
        body: JSON.stringify(postData),
      });

      if (response.ok) {
        setStatusMessage({ type: "success", text: "Blog post published successfully!" });
        // Form ko clear kar dete hain
        setFormData({ title: "", category: "Development", readTime: "5 min read", coverImage: "", excerpt: "" });
        setContent("");
      } else {
        // Agar token invalid/expired ho
        const errorData = await response.json();
        setStatusMessage({ type: "error", text: errorData.message || "Failed to publish." });
      }
    } catch (error) {
      console.error("Publishing error:", error);
      setStatusMessage({ type: "error", text: "Network error. Is the Node.js server running?" });
    } finally {
      setIsPublishing(false);
    }
  };

  // ReactQuill toolbar settings (Bold, Italic, Headings, Links etc)
  const modules = {
    toolbar: [
      [{ 'header': [2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}],
      ['link', 'code-block'],
      ['clean']
    ],
  };

  return (
    <section className="w-full min-h-dvh pt-32 pb-24 bg-[#030712] font-jakarta">
      
      {/* Editor Dark Mode Styling Overrides */}
      <style>
        {`
          .ql-toolbar.ql-snow { border-color: rgba(255,255,255,0.1) !important; background-color: #0a0f1c; border-top-left-radius: 1rem; border-top-right-radius: 1rem; }
          .ql-container.ql-snow { border-color: rgba(255,255,255,0.1) !important; background-color: #070b14; border-bottom-left-radius: 1rem; border-bottom-right-radius: 1rem; min-height: 400px; color: white; font-size: 16px; font-family: inherit; }
          .ql-editor::before { color: #64748b !important; }
          .ql-snow .ql-stroke { stroke: #94a3b8 !important; }
          .ql-snow .ql-fill { fill: #94a3b8 !important; }
          .ql-snow .ql-picker { color: #94a3b8 !important; }
        `}
      </style>

      <div className="max-w-5xl mx-auto px-4 sm:px-6">
        
        <div className="mb-10">
          <h2 className="text-[12px] font-black text-[#3b82f6] uppercase tracking-[0.2em] mb-4 m-0">Admin Portal</h2>
          <h2 className="text-4xl sm:text-5xl font-black text-white m-0 tracking-tighter">Create New Post</h2>
        </div>

        {statusMessage && (
          <div className={`p-4 mb-8 rounded-xl flex items-center gap-3 ${statusMessage.type === 'success' ? 'bg-green-500/10 text-green-500 border border-green-500/20' : 'bg-red-500/10 text-red-500 border border-red-500/20'}`}>
            {statusMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <FileText className="w-5 h-5" />}
            <h2 className="m-0 text-inherit text-[15px] font-bold">{statusMessage.text}</h2>
          </div>
        )}

        <form onSubmit={handlePublish} className="flex flex-col gap-8">
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2 flex flex-col gap-2">
              <label className="text-slate-400 text-[13px] font-bold tracking-wider uppercase">Post Title</label>
              <input
                type="text"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full bg-[#0a0f1c] border border-white/5 rounded-xl py-4 px-5 text-white placeholder-slate-600 focus:outline-none focus:border-[#3b82f6] transition-all font-bold text-lg"
                placeholder="The Ultimate Guide to React..."
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-slate-400 text-[13px] font-bold tracking-wider uppercase">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full bg-[#0a0f1c] border border-white/5 rounded-xl py-4 px-5 text-white focus:outline-none focus:border-[#3b82f6] transition-all appearance-none font-bold"
              >
                <option value="Development">Development</option>
                <option value="Design">Design</option>
                <option value="Engineering">Engineering</option>
                <option value="E-Commerce">E-Commerce</option>
              </select>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-[13px] font-bold tracking-wider uppercase">Cover Image URL</label>
            <input
              type="url"
              name="coverImage"
              required
              value={formData.coverImage}
              onChange={handleInputChange}
              className="w-full bg-[#0a0f1c] border border-white/5 rounded-xl py-4 px-5 text-white placeholder-slate-600 focus:outline-none focus:border-[#3b82f6] transition-all"
              placeholder="https://images.unsplash.com/photo-..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-[13px] font-bold tracking-wider uppercase">Short Excerpt (Snippet)</label>
            <textarea
              name="excerpt"
              required
              rows="2"
              value={formData.excerpt}
              onChange={handleInputChange}
              className="w-full bg-[#0a0f1c] border border-white/5 rounded-xl py-4 px-5 text-white placeholder-slate-600 focus:outline-none focus:border-[#3b82f6] transition-all resize-none"
              placeholder="A brief summary of the post..."
            />
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-slate-400 text-[13px] font-bold tracking-wider uppercase">Main Content</label>
            <div className="rounded-xl overflow-hidden shadow-2xl">
              <ReactQuill 
                theme="snow" 
                value={content} 
                onChange={setContent} 
                modules={modules}
                placeholder="Start writing your architectural masterpiece..."
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isPublishing || !content || !formData.title}
            className="flex items-center justify-center gap-3 w-full sm:w-auto self-end px-10 py-5 rounded-2xl bg-linear-to-r from-[#3b82f6] to-[#2563eb] text-white hover:from-[#2563eb] hover:to-[#1d4ed8] transition-all outline-none active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed shadow-lg font-black tracking-wide"
          >
            {isPublishing ? (
              <h2 className="m-0 text-[16px] uppercase">Publishing...</h2>
            ) : (
              <>
                <UploadCloud className="w-5 h-5" />
                <h2 className="m-0 text-[16px] uppercase">Publish Article</h2>
              </>
            )}
          </button>

        </form>
      </div>
    </section>
  );
}