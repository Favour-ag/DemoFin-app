"use client";

import { useState } from "react";

export default function NotificationSettings() {
  const [notifications, setNotifications] = useState({
    email: false,
    userActivity: false,
    transactions: false,
    securityAlerts: false,
  });

  const toggle = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Saved settings:", notifications);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">Notification Settings</h2>
        <p className="text-sm text-gray-500">
          Manage your application's general settings and appearance.
        </p>
      </div>

      {/* Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {/* Email Notifications */}
        <div className="flex items-center justify-between border-b py-3">
          <div>
            <p className="font-medium text-sm">Email Notifications</p>
            <p className="text-sm text-gray-500">
              Receive email notifications for important events.
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.email}
              onChange={() => toggle("email")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer dark:bg-gray-300 peer-checked:bg-purple-600 relative">
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5" />
            </div>
            <span className="ml-2 text-sm">Enable</span>
          </label>
        </div>

        {/* User Activity */}
        <div className="flex items-center justify-between border-b py-3">
          <div>
            <p className="font-medium text-sm">User Activity</p>
            <p className="text-sm text-gray-500">
              Notifications about new user registrations and account status
              changes.
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.userActivity}
              onChange={() => toggle("userActivity")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer dark:bg-gray-300 peer-checked:bg-purple-600 relative">
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5" />
            </div>
            <span className="ml-2 text-sm">Enable</span>
          </label>
        </div>

        {/* Transactions */}
        <div className="flex items-center justify-between border-b py-3">
          <div>
            <p className="font-medium text-sm">Transactions</p>
            <p className="text-sm text-gray-500">
              Notifications about new transactions and status changes.
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.transactions}
              onChange={() => toggle("transactions")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer dark:bg-gray-300 peer-checked:bg-purple-600 relative">
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5" />
            </div>
            <span className="ml-2 text-sm">Enable</span>
          </label>
        </div>

        {/* Security Alerts */}
        <div className="flex items-center justify-between border-b py-3">
          <div>
            <p className="font-medium text-sm">Security Alerts</p>
            <p className="text-sm text-gray-500">
              Important security-related notifications.
            </p>
          </div>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={notifications.securityAlerts}
              onChange={() => toggle("securityAlerts")}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-purple-500 rounded-full peer dark:bg-gray-300 peer-checked:bg-purple-600 relative">
              <div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition peer-checked:translate-x-5" />
            </div>
            <span className="ml-2 text-sm">Enable</span>
          </label>
        </div>

        {/* Footer Buttons */}
        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            className="border px-4 py-2 rounded-md text-sm text-gray-600"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
}
