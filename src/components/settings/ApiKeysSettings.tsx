"use client";

import { useState } from "react";
import { Eye, EyeOff, Copy, Filter, Plus } from "lucide-react";

type ApiKey = {
  id: number;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  status: "Activated" | "Revoked";
};

const mockKeys: ApiKey[] = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  name: [
    "Towne, Dooley and Graham",
    "Doyle, Koss and Schmidt",
    "Stanton Inc",
    "Hayes, Strosin and Bogisich",
    "Bashirian, Krajcik and Hauck",
  ][i % 5],
  key: "sk_hnox9GajvNUE9-5np2qxKl2",
  created: `Jan ${6 - (i % 4)}, 2025`,
  lastUsed: `Jan ${6 - (i % 4)}, 2025`,
  status: i % 3 === 0 ? "Activated" : "Revoked",
}));

export default function ApiKeysSettings() {
  const [keys, setKeys] = useState<ApiKey[]>(mockKeys);
  const [showKeys, setShowKeys] = useState<{ [id: number]: boolean }>({});

  const toggleStatus = (id: number) => {
    setKeys((prev) =>
      prev.map((key) =>
        key.id === id
          ? {
              ...key,
              status: key.status === "Activated" ? "Revoked" : "Activated",
            }
          : key
      )
    );
  };

  const toggleVisibility = (id: number) => {
    setShowKeys((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const copyToClipboard = (key: string) => {
    navigator.clipboard.writeText(key);
    alert("API Key copied!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold">API Keys Settings</h2>
        <p className="text-sm text-gray-500">
          Manage your API keys for accessing the DemoFin API
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <input
          type="text"
          placeholder="Search by name, email"
          className="border px-4 py-2 rounded-md w-full md:w-1/2 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        <div className="flex gap-2">
          <button className="flex items-center gap-1 border px-4 py-2 rounded-md text-sm text-gray-600">
            <Filter className="w-4 h-4" /> Filters
          </button>
          <button className="flex items-center gap-1 bg-purple-600 text-white px-4 py-2 rounded-md text-sm hover:bg-purple-700">
            <Plus className="w-4 h-4" /> Generate new key
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border rounded-md">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3">
                <input type="checkbox" />
              </th>
              <th className="px-4 py-3">Key Name</th>
              <th className="px-4 py-3">Recent Transition</th>
              <th className="px-4 py-3">Date Created</th>
              <th className="px-4 py-3">Last Used</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {keys.map((key) => (
              <tr key={key.id} className="border-b">
                <td className="px-4 py-3">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-3">{key.name}</td>
                <td className="px-4 py-3 flex items-center gap-2 max-w-xs">
                  <input
                    readOnly
                    type={showKeys[key.id] ? "text" : "password"}
                    value={key.key}
                    className="w-full bg-transparent outline-none"
                  />
                  <button onClick={() => toggleVisibility(key.id)}>
                    {showKeys[key.id] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                  <button onClick={() => copyToClipboard(key.key)}>
                    <Copy className="w-4 h-4" />
                  </button>
                </td>
                <td className="px-4 py-3">{key.created}</td>
                <td className="px-4 py-3">{key.lastUsed}</td>
                <td className="px-4 py-3">
                  <span
                    className={`text-xs font-medium px-2 py-1 rounded-full ${
                      key.status === "Activated"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {key.status}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleStatus(key.id)}
                    className={`text-sm px-3 py-1 rounded-md border ${
                      key.status === "Activated"
                        ? "text-red-600 border-red-600 hover:bg-red-50"
                        : "text-green-600 border-green-600 hover:bg-green-50"
                    }`}
                  >
                    {key.status === "Activated" ? "Revoke" : "Activate"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center text-sm text-gray-600 mt-4">
        <button className="px-4 py-1 border rounded-md">← Previous</button>
        <div className="flex items-center gap-2">
          {[1, 2, 3, "...", 10].map((page, idx) => (
            <button
              key={idx}
              className={`px-3 py-1 rounded-md ${
                page === 1 ? "bg-purple-600 text-white" : "hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          ))}
        </div>
        <button className="px-4 py-1 border rounded-md">Next →</button>
      </div>
    </div>
  );
}
