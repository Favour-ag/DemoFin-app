// "use client";
// import React from "react";

// import Link from "next/link";

// export default function LoginPage() {
//   return (
//     <div className="min-h-screen flex items-center justify-center font-inter ">
//       <div className=" w-[600px] max-w-[600px] space-y-8 p-8  rounded-lg shadow-sm">
//         <div className="space-y-6 ">
//           <div className="flex flex-col justify-center items-center space-y-5">
//             <div className="w-8 h-8 rounded-md bg-purple-600 text-white flex items-center justify-center font-bold text-2xl">
//               S
//             </div>

//             <h2 className="text-[30px] leading-[24px] font-[600] text-gray-900 ">
//               Spendin Admin
//             </h2>
//             <p className="text-[16px] leading-[24px] font-[400] text-gray-600">
//               Log in to your admin dashboard
//             </p>
//           </div>
//           <form className="space-y-4 bg-white px-10 py-10 rounded-lg">
//             <div className="">
//               <p className="text-[24px] leading-[32px] font-[600] text-gray-900 ">
//                 Log In
//               </p>
//               <p className="text-[14px] leading-[20px] font-[400] text-gray-600">
//                 Enter your email and password to access your account
//               </p>
//             </div>
//             <div className="mt-20">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//                 placeholder="Enter your email"
//               />
//             </div>
//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//                 placeholder="Enter your password"
//               />
//             </div>
//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="remember-me"
//                   className="ml-2 block text-sm text-gray-700"
//                 >
//                   Remember me
//                 </label>
//               </div>
//               <div className="text-sm">
//                 <Link
//                   href="/forgot-password"
//                   className="font-medium text-primary hover:text-primary/80"
//                 >
//                   Forgot password?
//                 </Link>
//               </div>
//             </div>
//             <div>
//               <Link href={"/dashboard"} className="w-full">
//                 <button
//                   type="submit"
//                   className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                 >
//                   Sign in
//                 </button>
//               </Link>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useState } from "react";
// import { useAuth } from "@/app/context/AuthContext";
// import { login as loginAPI } from "@/api/auth";

// export default function LoginPage() {
//   const { login } = useAuth();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await loginAPI(form); // calls axios -> /auth/login
//       login(res.token, res.user); // stores in context
//     } catch (err: any) {
//       alert(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center font-inter">
//       <div className="w-[600px] max-w-[600px] space-y-8 p-8 rounded-lg shadow-sm">
//         <form
//           onSubmit={handleSubmit}
//           className="space-y-4 bg-white px-10 py-10 rounded-lg"
//         >
//           <div>
//             <p className="text-[24px] font-[600]">Log In</p>
//             <p className="text-sm text-gray-600">Enter your credentials</p>
//           </div>
//           <div>
//             <label>Email</label>
//             <input
//               name="email"
//               type="email"
//               value={form.email}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>
//           <div>
//             <label>Password</label>
//             <input
//               name="password"
//               type="password"
//               value={form.password}
//               onChange={handleChange}
//               className="w-full border rounded px-3 py-2"
//               required
//             />
//           </div>
//           <button
//             type="submit"
//             className="w-full bg-primary text-white py-2 rounded"
//             disabled={loading}
//           >
//             {loading ? "Logging in..." : "Sign In"}
//           </button>
//         </form>
//       </div>
//     </div>
//   );
// }
// "use client";

// import React, { useState } from "react";
// import { useAuth } from "@/app/context/AuthContext";
// import { login as loginAPI } from "@/api/auth";

// export default function LoginPage() {
//   const { login } = useAuth();
//   const [form, setForm] = useState({ email: "", password: "" });
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
//     setForm({ ...form, [e.target.name]: e.target.value });

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setLoading(true);
//     try {
//       const res = await loginAPI(form); // Call /auth/login
//       console.log("API login response:", res);
//       login(res.token, res.user); // Save to context + redirect

//       console.log("Saved to localStorage:", {
//         token: localStorage.getItem("token"),
//         user: localStorage.getItem("user"),
//       });
//     } catch (err: any) {
//       alert(err?.response?.data?.message || "Login failed.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center font-inter">
//       <div className="w-[600px] max-w-[600px] space-y-8 p-8 rounded-lg shadow-sm">
//         <div className="space-y-6">
//           <div className="flex flex-col justify-center items-center space-y-5">
//             <div className="w-8 h-8 rounded-md bg-purple-600 text-white flex items-center justify-center font-bold text-2xl">
//               S
//             </div>
//             <h2 className="text-[30px] leading-[24px] font-[600] text-gray-900">
//               Spendin Admin
//             </h2>
//             <p className="text-[16px] leading-[24px] font-[400] text-gray-600">
//               Log in to your admin dashboard
//             </p>
//           </div>

//           <form
//             onSubmit={handleSubmit}
//             className="space-y-4 bg-white px-10 py-10 rounded-lg"
//           >
//             <div>
//               <p className="text-[24px] leading-[32px] font-[600] text-gray-900">
//                 Log In
//               </p>
//               <p className="text-[14px] leading-[20px] font-[400] text-gray-600">
//                 Enter your email and password to access your account
//               </p>
//             </div>

//             <div className="mt-20">
//               <label
//                 htmlFor="email"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Email
//               </label>
//               <input
//                 id="email"
//                 name="email"
//                 type="email"
//                 required
//                 value={form.email}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//                 placeholder="Enter your email"
//               />
//             </div>

//             <div>
//               <label
//                 htmlFor="password"
//                 className="block text-sm font-medium text-gray-700"
//               >
//                 Password
//               </label>
//               <input
//                 id="password"
//                 name="password"
//                 type="password"
//                 required
//                 value={form.password}
//                 onChange={handleChange}
//                 className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
//                 placeholder="Enter your password"
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center">
//                 <input
//                   id="remember-me"
//                   name="remember-me"
//                   type="checkbox"
//                   className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
//                 />
//                 <label
//                   htmlFor="remember-me"
//                   className="ml-2 block text-sm text-gray-700"
//                 >
//                   Remember me
//                 </label>
//               </div>
//               <div className="text-sm">
//                 <a
//                   href="#"
//                   className="font-medium text-primary hover:text-primary/80"
//                 >
//                   Forgot password?
//                 </a>
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
//                 disabled={loading}
//               >
//                 {loading ? "Signing in..." : "Sign in"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";

import React, { useState } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { login as loginAPI } from "@/app/lib/api/auth";
import { Eye, EyeOff } from "lucide-react"; // ✅ import icons

export default function LoginPage() {
  const { login } = useAuth();
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { token, user } = await loginAPI(form); // ✅ unwrap from .data in login.ts
      if (!token || !user) throw new Error("Invalid login response");

      login(token, user); // ✅ store in localStorage + context
      console.log("✅ Saved to localStorage:", {
        token: localStorage.getItem("token"),
        user: localStorage.getItem("user"),
      });
    } catch (err: any) {
      alert(err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center font-inter">
      <div className="w-[600px] max-w-[600px] space-y-8 p-8 rounded-lg shadow-sm">
        <div className="space-y-6">
          <div className="flex flex-col justify-center items-center space-y-5">
            <div className="w-8 h-8 rounded-md bg-purple-600 text-white flex items-center justify-center font-bold text-2xl">
              S
            </div>
            <h2 className="text-[30px] font-[600] text-gray-900">
              Spendin Admin
            </h2>
            <p className="text-[16px] font-[400] text-gray-600">
              Log in to your admin dashboard
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="space-y-4 bg-white px-10 py-10 rounded-lg"
          >
            <div>
              <p className="text-[24px] font-[600] text-gray-900">Log In</p>
              <p className="text-[14px] font-[400] text-gray-600">
                Enter your email and password to access your account
              </p>
            </div>

            <div className="mt-20">
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
                required
                value={form.email}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter your email"
              />
            </div>
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
                required
                value={form.password}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary pr-10"
                placeholder="Enter your password"
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

            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-sm text-gray-700"
                >
                  Remember me
                </label>
              </div>
              <div className="text-sm">
                <a
                  href="#"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Forgot password?
                </a>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                disabled={loading}
              >
                {loading ? "Signing in..." : "Sign in"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
