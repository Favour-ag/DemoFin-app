"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center font-inter ">
      <div className=" w-[600px] max-w-[600px] space-y-8 p-8  rounded-lg shadow-sm">
        <div className="space-y-6 ">
          <div className="flex flex-col justify-center items-center space-y-5">
            <Image
              src="/svg/single_logo.svg"
              alt="logo"
              width={48}
              height={48}
            />
            <h2 className="text-[30px] leading-[24px] font-[600] text-gray-900 ">
              Spendin Admin
            </h2>
            <p className="text-[16px] leading-[24px] font-[400] text-gray-600">
              Log in to your admin dashboard
            </p>
          </div>
          <form className="space-y-4 bg-white px-10 py-10 rounded-lg">
            <div className="">
              <p className="text-[24px] leading-[32px] font-[600] text-gray-900 ">
                Log In
              </p>
              <p className="text-[14px] leading-[20px] font-[400] text-gray-600">
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
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter your email"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="mt-1 block w-full px-3 py-2 border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary"
                placeholder="Enter your password"
              />
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
                <Link
                  href="/forgot-password"
                  className="font-medium text-primary hover:text-primary/80"
                >
                  Forgot password?
                </Link>
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
