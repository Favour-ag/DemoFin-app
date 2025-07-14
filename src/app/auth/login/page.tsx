"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { login as loginAPI } from "@/lib/api/auth";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  //  Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      toast.error("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const { token, user } = await loginAPI(form);
      if (!token || !user) throw new Error("Invalid login response");

      login(token, user);
      toast.success("Login successful!");

      setTimeout(() => router.push("/dashboard"), 500);
    } catch (err: any) {
      toast.error(err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#FAFAFA] px-4">
      <div className="flex flex-col items-center space-y-6 w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center space-y-2">
          <div className="w-10 h-10 bg-purple-600 text-white flex items-center justify-center rounded-xl text-xl font-bold">
            S
          </div>
          <h2 className="text-2xl font-semibold text-gray-900">
            Spendin Admin
          </h2>
          <p className="text-sm text-gray-600">
            Log in to your admin dashboard
          </p>
        </div>

        {/* ✅ Login form */}
        <div className="w-full space-y-8 p-6 bg-white rounded-xl shadow">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <p className="text-lg font-semibold text-gray-900">Log In</p>
              <p className="text-sm text-gray-600 mt-1">
                Enter your email and password to access your account
              </p>
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                placeholder="Enter your email"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500"
              />
            </div>

            {/* Password */}
            <div className="relative">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={handleChange}
                required
                placeholder="Enter your password"
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md text-sm shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
                tabIndex={-1}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>

            {/* Checkbox and Forgot Password */}
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 text-gray-700">
                <input
                  type="checkbox"
                  className="h-4 w-4 border-gray-300 rounded text-purple-600 focus:ring-purple-500"
                />
                <span>Remember for 30 days</span>
              </label>
              <a href="#" className="text-purple-600 hover:underline">
                Forgot password?
              </a>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full py-2 px-4 text-white bg-purple-600 hover:bg-purple-700 rounded-md text-sm font-medium disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
