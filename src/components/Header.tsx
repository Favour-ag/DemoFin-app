import React from "react";
import { Search, Notification } from "../../public/svg";
import Image from "next/image";

function Header() {
  return (
    <div className="border-b border-gray-200 py-5 px-5 bg-white">
      <div className="flex flex-row justify-between items-center">
        <div className="h-10 w-[356px] relative">
          <input
            className="w-full h-full outline-none text-gray-400 placeholder:text-gray-400 placeholder:text-[14px] border border-gray-200 rounded-md pl-10 pr-3"
            placeholder="Search anything"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search stroke="#A4A7AE" width={18} height={18} />
          </div>
        </div>
        <div className="flex flex-row items-center space-x-4">
          <Notification />
          <p className="font-[400] ">Dremo Drizzy</p>
          <Image src="/svg/avatar.svg" alt="avatar" width={32} height={32} />
        </div>
      </div>
    </div>
  );
}

export default Header;
