import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Loader2, ArrowRight } from "lucide-react";
import { API_URL } from "../lib/api";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        navigate("/admin/create-post");
      } else {
        setError(data.message);
      }
    } catch {
      setError("Server error. Please make sure backend is running.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-dvh bg-[#030712] flex items-center justify-center font-jakarta px-4 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="w-full max-w-md bg-[#0a0f1c]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 sm:p-10 relative z-10 shadow-2xl">
        <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center mb-8 mx-auto">
          <Lock className="w-7 h-7 text-blue-500" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-white text-center mb-2 m-0 tracking-tight">
          Admin Portal
        </h2>
        <p className="text-slate-400 text-center text-[14px] mb-8 font-medium">
          Please login to access the dashboard.
        </p>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-[13px] font-bold px-4 py-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-[#030712] border border-white/10 rounded-xl py-3.5 px-4 text-[14px] text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-[12px] font-bold text-slate-400 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#030712] border border-white/10 rounded-xl py-3.5 px-4 text-[14px] text-white placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-colors"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3.5 rounded-xl mt-2 transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
              <>
                Login <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
