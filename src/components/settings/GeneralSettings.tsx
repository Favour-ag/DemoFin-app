import { CloudUpload, Mail } from "lucide-react";
import { useState } from "react";
import Button from "../Button";

export default function GeneralSettings() {
  const [form, setForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-lg font-semibold">General Settings</h2>
        <p className="text-sm text-gray-500">
          Manage your application's general settings and appearance.
        </p>
      </div>

      <form className="space-y-6">
        {/* Company Name */}
        <div className="flex space-x-0 lg:space-x-36 border-b">
          <label className="block text-sm font-medium ">Company name</label>
          <div className="flex items-center w-96">
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Enter company name"
              className="w-full border px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            />
          </div>
        </div>
        {/* Company Email  */}
        <div className="flex space-x-0 lg:space-x-24 border-b">
          <label className="block text-sm font-medium ">
            Company email address
          </label>
          <div className="flex items-center w-96 relative">
            <Mail className="absolute top-2.5 left-2.5 text-gray-500" />
            <input
              type="password"
              name="currentPassword"
              value={form.currentPassword}
              onChange={handleChange}
              placeholder="Enter company email address"
              className="w-full border px-4 py-2 pl-10 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 mb-4"
            />
          </div>
        </div>
        {/* Company Logo */}
        <div className="flex space-x-0 lg:space-x-36 border-b">
          <label className="block text-sm font-medium ">Company logo</label>
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-10 relative bottom-14 bg-purple-100 rounded-full flex items-center justify-center font-bold text-purple-600">
              OR
            </div>
            <label className="flex flex-col items-center justify-center border-dashed border-2 border-gray-300 rounded-md p-6 text-center cursor-pointer text-sm text-gray-500 space-y-2 w-full lg:w-[350px]">
              <span className="text-3xl  w-10 h-10  bg-gray-50 rounded-full flex items-center justify-center font-bold text-gray-500">
                <CloudUpload />
              </span>
              <input type="file" className="hidden" />
              <span className="text-purple-600 font-medium underline">
                Click to upload
              </span>
              or drag and drop
              <br />
              <span className="text-xs text-gray-400">
                SVG, PNG, JPG or GIF (max. 800×400px)
              </span>
            </label>
          </div>
        </div>
      </form>
      <div className="flex justify-end gap-2">
        <Button className="border px-4 py-2 rounded-md text-sm text-gray-600">
          Cancel
        </Button>
        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm">
          Save
        </Button>
      </div>
    </div>
  );
}
