// "use client";
// import React, { useState } from "react";

// import Link from "next/link";
// import {
//   BarChart,
//   Dollar,
//   FileText,
//   Icon,
//   Wallet,
//   User,
//   Users,
//   Settings,
//   Logout,
// } from "../../public/svg/index"; // Make sure other icons are imported here
// import Button from "./Button";
// import Image from "next/image";

// const menuItems = [
//   {
//     text: "Dashboard",
//     icon: BarChart, // Referencing the component directly
//     isSettings: false,
//   },
//   {
//     text: "User",
//     icon: User,
//     isSettings: false,
//   },
//   {
//     text: "Transactions",
//     icon: Dollar,
//     isSettings: false,
//   },
//   {
//     text: "Wallets",
//     icon: Wallet,
//     isSettings: false,
//   },
//   {
//     text: "Liquidity",
//     icon: Icon,
//     isSettings: false,
//   },
//   {
//     text: "Admins",
//     icon: Users,
//     isSettings: false,
//   },
//   {
//     text: "Audit Logs",
//     icon: FileText,
//     isSettings: false,
//   },
//   {
//     text: "Settings",
//     icon: Settings,
//     isSettings: true,
//   },
// ];

// function SidePanel() {
//   const [activeIndex, setActiveIndex] = useState(0);

//   const handleLinkClick = (index: number) => {
//     setActiveIndex(index);
//   };

//   const mainMenuItems = menuItems.filter((item) => !item.isSettings);
//   const settingsItem = menuItems.find((item) => item.isSettings);

//   return (
//     <aside className="text-white h-screen fixed w-1/6 max-w-1/6  flex flex-col justify-between py-10 border-r border-gray700">
//       <div className="space-y-10 justify-center  ">
//         <div className="px-3">
//           <Image src="/svg/logo.svg" alt="logo" width={200} height={200} />
//         </div>
//         <div className="w-full px-5 space-y-1 ">
//           {mainMenuItems.map((item, index) => {
//             const IconComponent = item.icon; // Get the icon component
//             return (
//               <Link
//                 href="/"
//                 onClick={() => handleLinkClick(index)}
//                 key={index}
//                 className={`flex items-center py-3 pl-3 space-x-4 ${
//                   activeIndex === index
//                     ? " bg-gray-50 rounded-md"
//                     : "bg-transparent text-black"
//                 }`}
//               >
//                 <IconComponent
//                   stroke={activeIndex === index ? "#8A00F5" : "#414651"}
//                 />

//                 <p
//                   className={`text-[16px] leading-[24px] font-[500] font-inter  ${
//                     activeIndex === index ? " text-primary" : ""
//                   }`}
//                 >
//                   {item.text}
//                 </p>
//               </Link>
//             );
//           })}
//         </div>
//       </div>
//       <div className="px-5 mt-auto mb-5 ">
//         {settingsItem && (
//           <Link
//             href="/"
//             onClick={() => handleLinkClick(menuItems.length - 1)}
//             className={`flex items-center py-3 pl-3 space-x-4 ${
//               activeIndex === menuItems.length - 1
//                 ? "bg-gray-50 rounded-md"
//                 : "bg-transparent text-black"
//             }`}
//           >
//             <Settings
//               stroke={
//                 activeIndex === menuItems.length - 1 ? "#8A00F5" : "#414651"
//               }
//             />
//             <p
//               className={`text-[16px] leading-[24px] font-[500] ${
//                 activeIndex === menuItems.length - 1 ? "text-primary" : ""
//               }`}
//             >
//               {settingsItem.text}
//             </p>
//           </Link>
//         )}
//         <div className="flex flex-row justify-between pl-3 border-t border-gray-200 pt-5  mt-2">
//           <div className="flex flex-row space-x-4">
//             <Image
//               src="/svg/Avatar.svg"
//               alt="telephone"
//               width={32}
//               height={32}
//             />
//             <div className="">
//               <p className=" text-gray-900 font-semibold text-[14px] leading-[20px]">
//                 Olivia Rhye
//               </p>
//               <p className="text-gray-600 font-light text-[14px] leading-[20px]">
//                 olivia@untitledui.com
//               </p>
//             </div>
//           </div>
//           <Logout />
//         </div>
//       </div>
//     </aside>
//   );
// }

// export default SidePanel;
"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  Dollar,
  FileText,
  Icon,
  Wallet,
  User,
  Users,
  Settings,
  Logout,
} from "../../public/svg/index";
import Image from "next/image";

const menuItems = [
  {
    text: "Dashboard",
    icon: BarChart,
    path: "/dashboard",
    isSettings: false,
  },
  {
    text: "User",
    icon: User,
    path: "/user",
    isSettings: false,
  },
  {
    text: "Transactions",
    icon: Dollar,
    path: "/transactions",
    isSettings: false,
  },
  {
    text: "Wallets",
    icon: Wallet,
    path: "/wallets",
    isSettings: false,
  },
  {
    text: "Liquidity",
    icon: Icon,
    path: "/liquidity",
    isSettings: false,
  },
  {
    text: "Admins",
    icon: Users,
    path: "/admins",
    isSettings: false,
  },
  {
    text: "Audit Logs",
    icon: FileText,
    path: "/audit-logs",
    isSettings: false,
  },
  {
    text: "Settings",
    icon: Settings,
    path: "/settings",
    isSettings: true,
  },
];

function SidePanel() {
  const pathname = usePathname();
  const [activePath, setActivePath] = useState(pathname);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const mainMenuItems = menuItems.filter((item) => !item.isSettings);
  const settingsItem = menuItems.find((item) => item.isSettings);

  return (
    <>
      {/* Mobile menu button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-md bg-white shadow-md"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 transform ${
          isMobileOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 transition-transform duration-300 ease-in-out z-40 w-56 bg-white border-r border-gray-200 flex flex-col`}
      >
        <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
          <div className="flex items-center justify-center px-4 mb-8">
            <span className="text-xl font-bold text-gray-900">DemoFin</span>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {mainMenuItems.map((item, index) => {
              const IconComponent = item.icon;
              const isActive = activePath === item.path;

              return (
                <Link
                  href={item.path}
                  key={index}
                  className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                    isActive
                      ? "bg-purple-50 text-purple-700"
                      : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                  }`}
                  onClick={() => setIsMobileOpen(false)}
                >
                  <IconComponent
                    stroke={isActive ? "#8A00F5" : "#414651"}
                    className="mr-3 flex-shrink-0"
                  />
                  {item.text}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="px-4 py-4 border-t border-gray-200">
          {settingsItem && (
            <Link
              href={settingsItem.path}
              className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg ${
                activePath === settingsItem.path
                  ? "bg-purple-50 text-purple-700"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
              }`}
              onClick={() => setIsMobileOpen(false)}
            >
              <Settings
                stroke={
                  activePath === settingsItem.path ? "#8A00F5" : "#414651"
                }
                className="mr-3 flex-shrink-0"
              />
              {settingsItem.text}
            </Link>
          )}

          <div className="flex items-center justify-between pt-4 mt-4">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                <span className="text-xs font-medium text-gray-600">OR</span>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-900">Olivia Rhye</p>
                <p className="text-xs text-gray-500">olivia@untitledui.com</p>
              </div>
            </div>
            <button className="text-gray-500 hover:text-gray-700">
              <Logout />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}
    </>
  );
}

export default SidePanel;
