"use client";

import { useState } from "react";
import Toggle from "../Toggle";

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
        <div className="flex space-x-0 lg:space-x-24 border-b">
          <label className="block text-sm font-medium mb-1">
            Two factor authentication
          </label>
          <div className="flex items-start justify-between  pb-4">
            <div>
              <div className="flex gap-1">
                <label className="inline-flex items-center cursor-pointer">
                  <Toggle active={status === "active"} />
                </label>
                <p className="text-sm font-medium">Enable 2FA</p>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Add an extra layer of security to your account.
              </p>
            </div>
          </div>
        </div>

        {/* Password Fields */}
        <div className="flex space-x-0 lg:space-x-36 border-b">
          <label className="block text-sm font-medium ">Current password</label>
          <div className="flex items-center w-96">
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Enter current password"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            />
          </div>
        </div>

        <div className="flex space-x-4 lg:space-x-40 border-b">
          <label className="block text-sm font-medium ">New Password</label>
          <div className="flex items-center w-96">
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            />
          </div>
        </div>
        <div className="flex space-x-0 lg:space-x-36 border-b">
          <label className="block text-sm font-medium ">Confirm password</label>
          <div className="flex items-center w-96">
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="Enter new password"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            />
          </div>
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
