"use client";
import React, { useState, useEffect } from "react";
import { useAuth } from "@/app/context/AuthContext";
import { useRouter } from "next/navigation";

import { Search, Notification } from "../../public/svg";
import Image from "next/image";

function Header() {
  const { user, isHydrated } = useAuth();
  const router = useRouter();

  if (!isHydrated) return null;

  return (
    <div className="border-b border-gray-200 py-4 px-4 bg-white">
      <div className="flex flex-row justify-between items-center">
        {/* Search Bar */}
        <div className="h-10 w-[356px] relative">
          <input
            className="w-full h-full outline-none text-gray-400 placeholder:text-gray-400 placeholder:text-[14px] border border-gray-200 rounded-md pl-10 pr-3"
            placeholder="Search anything"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search stroke="#A4A7AE" width={18} height={18} />
          </div>
        </div>

        {/* User Info */}
        <div className="flex flex-row items-center space-x-4">
          <Notification />

          <p className="font-[400] text-sm md:text-base text-gray-700">
            {user?.name?.split("@")[0] || "Admin"}
          </p>

          <Image
            src="/image.png"
            alt="avatar"
            width={32}
            height={32}
            className="rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
