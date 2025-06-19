"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart,
  Dollar,
  FileText,
  Wallet,
  User,
  Users,
  Settings,
  Logout,
} from "../../public/svg/index";

const menuItems = [
  {
    text: "Dashboard",
    icon: BarChart,
    path: "/dashboard",
    isSettings: false,
  },
  {
    text: "Users",
    icon: User,
    path: "/users",
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

  useEffect(() => {
    setActivePath(pathname);
  }, [pathname]);

  const mainMenuItems = menuItems.filter((item) => !item.isSettings);
  const settingsItem = menuItems.find((item) => item.isSettings);

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-20 lg:w-56 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center justify-center mb-4 lg:justify-start pl-0 lg:pl-2 mt-2">
          <div className="flex items-center gap-2 px-4 mb-8 cursor-pointer">
            {/* Icon Block */}
            <div className="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
              S
            </div>

            {/* Text */}
            <span className="text-lg font-semibold text-gray-900 hidden lg:block">
              spendin_admin
            </span>
          </div>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          {mainMenuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = activePath === item.path;

            return (
              <Link
                href={item.path}
                key={index}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
                  isActive
                    ? "bg-purple-50 text-purple-700"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                }`}
              >
                <IconComponent
                  stroke={isActive ? "#8A00F5" : "#414651"}
                  className="flex-shrink-0 mr-0 md:mr-3"
                />
                <span className="hidden lg:inline">{item.text}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-2 py-4 border-t border-gray-200">
        {settingsItem && (
          <Link
            href={settingsItem.path}
            className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-colors ${
              activePath === settingsItem.path
                ? "bg-purple-50 text-purple-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Settings
              stroke={activePath === settingsItem.path ? "#8A00F5" : "#414651"}
              className="flex-shrink-0 mr-0 lg:mr-3"
            />
            <span className="hidden lg:inline">{settingsItem.text}</span>
          </Link>
        )}

        <div className="flex items-center justify-center lg:justify-between pt-4 mt-4">
          <div className="hidden lg:flex items-center">
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
  );
}

export default SidePanel;
