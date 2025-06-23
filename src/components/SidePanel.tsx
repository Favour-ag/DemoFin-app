"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart3,
  CircleDollarSign,
  FileText,
  Wallet,
  User,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const menuItems = [
  {
    text: "Dashboard",
    icon: BarChart3,
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
    icon: CircleDollarSign,
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

  const mainMenuItems = useMemo(
    () => menuItems.filter((item) => !item.isSettings),
    []
  );
  const settingsItem = useMemo(
    () => menuItems.find((item) => item.isSettings),
    []
  );

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-20 lg:w-56 bg-white border-r border-gray-200 flex flex-col transition-all duration-300 ease-in-out">
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <div className="flex items-center justify-center mb-4 lg:justify-start pl-0 lg:pl-2 mt-2">
          <div className="flex items-center gap-2 px-4 mb-8 cursor-pointer">
            <Link href="/dashboard" className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-purple-600 text-white flex items-center justify-center font-bold text-sm">
                S
              </div>
              <span className="text-lg font-semibold text-gray-900 hidden lg:block">
                spendin_admin
              </span>
            </Link>
          </div>
        </div>

        <nav className="flex-1 px-2 space-y-1">
          {mainMenuItems.map((item, index) => {
            const IconComponent = item.icon;
            const isActive = pathname === item.path;

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
                  className="w-5 h-5 flex-shrink-0 mr-0 md:mr-3"
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
              pathname === settingsItem.path
                ? "bg-purple-50 text-purple-700"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            }`}
          >
            <Settings
              stroke={pathname === settingsItem.path ? "#8A00F5" : "#414651"}
              className="w-5 h-5 flex-shrink-0 mr-0 lg:mr-3"
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
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>
    </aside>
  );
}

export default React.memo(SidePanel);
