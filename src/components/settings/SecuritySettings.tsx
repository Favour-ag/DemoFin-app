"use client";

import { useState } from "react";

export default function SecuritySettings() {
  const [is2FAEnabled, setIs2FAEnabled] = useState(false);
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save logic
    console.log({ is2FAEnabled, ...form });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">Security Settings</h2>
        <p className="text-sm text-gray-500">
          Manage your application's general settings and appearance.
        </p>
      </div>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* 2FA Toggle */}
        <div>
          <label className="flex items-start gap-4">
            <input
              type="checkbox"
              className="mt-1 h-4 w-4"
              checked={is2FAEnabled}
              onChange={() => setIs2FAEnabled(!is2FAEnabled)}
            />
            <div>
              <p className="text-sm font-medium">Enable 2FA</p>
              <p className="text-sm text-gray-500">
                Add an extra layer of security to your account.
              </p>
            </div>
          </label>
        </div>

        {/* Password Fields */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Current password
          </label>
          <input
            type="password"
            name="currentPassword"
            value={form.currentPassword}
            onChange={handleChange}
            placeholder="Enter current password"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">New password</label>
          <input
            type="password"
            name="newPassword"
            value={form.newPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Confirm password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={form.confirmPassword}
            onChange={handleChange}
            placeholder="Enter new password"
            className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-2">
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
