"use client";

import { useState } from "react";
import GeneralSettings from "./GeneralSettings";
import SecuritySettings from "./SecuritySettings";
import ApiKeysSettings from "./ApiKeysSettings";
import NotificationSettings from "./NotificationSettings";
import Button from "../Button";
import { CalendarDays } from "lucide-react";

const tabs = [
  { label: "General", value: "general" },
  { label: "Security", value: "security" },
  { label: "API Keys", value: "api" },
  { label: "Notifications", value: "notifications" },
];

export default function SettingsTabs() {
  const [activeTab, setActiveTab] = useState("general");

  return (
    <div className="p-6 space-y-6 bg-white">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Settings</h1>
        <Button
          className="gap-2 border text-gray-700 text-sm md:text-base"
          bgColor="#fff"
        >
          <CalendarDays className="w-4 h-4" />
          <span className="whitespace-nowrap">Jan 06, 2025 - Jan 13, 2025</span>
        </Button>
      </div>

      <div className="flex gap-6 border-b border-gray-200">
        {tabs.map((tab) => (
          <button
            key={tab.value}
            onClick={() => setActiveTab(tab.value)}
            className={`py-2 px-1 text-sm border-b-2 transition-all ${
              activeTab === tab.value
                ? "border-purple-600 text-purple-600 font-medium"
                : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {activeTab === "general" && <GeneralSettings />}
      {activeTab === "security" && <SecuritySettings />}
      {activeTab === "api" && <ApiKeysSettings />}
      {activeTab === "notifications" && <NotificationSettings />}
    </div>
  );
}
