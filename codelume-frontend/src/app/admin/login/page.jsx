"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Loader2, ArrowRight } from "lucide-react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_URL || "https://codelume-rb3h.onrender.com";

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("adminToken", data.token);
        router.push("/admin/dashboard");
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
    <div className="min-h-dvh bg-[#f8f8f8] flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white border border-gray-200 rounded-[20px] p-8 sm:p-10 shadow-sm">
        <div className="w-14 h-14 bg-black rounded-2xl flex items-center justify-center mb-6 mx-auto">
          <Lock className="w-7 h-7 text-white" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bold text-black text-center mb-2 tracking-tight">
          Admin Portal
        </h2>
        <p className="text-gray-500 text-center text-[14px] mb-8">
          Please login to access the dashboard.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 text-[13px] font-medium px-4 py-3 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="flex flex-col gap-5">
          <div>
            <label className="block text-[12px] font-medium text-gray-500 uppercase tracking-wider mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-[14px] text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <label className="block text-[12px] font-medium text-gray-500 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-200 rounded-xl py-3.5 px-4 text-[14px] text-black placeholder-gray-400 focus:outline-none focus:border-black transition-colors"
              placeholder="Enter password"
              required
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-black hover:bg-gray-900 text-white font-medium py-3.5 rounded-xl mt-2 transition-all active:scale-[0.98] flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
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
        <p className="text-[12px] text-gray-400 mt-5 text-center">
          CodeLume Admin • Only for site owner
        </p>
      </div>
    </div>
  );
}
