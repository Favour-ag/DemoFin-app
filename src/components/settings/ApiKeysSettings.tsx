"use client";

import { useState } from "react";
import {
  Eye,
  EyeOff,
  Copy,
  Filter,
  Plus,
  Search,
  ListFilter,
  UserPlus,
  Key,
} from "lucide-react";
import Button from "../Button";
import Pagination from "../Pagination";

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
  const [currentPage, setCurrentPage] = useState<number>(1);
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

      {/* Search and Action Buttons */}
      <div className="flex flex-col md:flex-row justify-between p-3 items-start md:items-center bg-gray-50 mt-4">
        {/* Input Search */}
        <div className="h-10 w-[356px] relative">
          <input
            className="w-full h-full  text-gray-400 placeholder:text-gray-400 placeholder:text-[14px] border border-gray-300 rounded-md pl-10 pr-3"
            placeholder="Search by name, email"
          />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Search stroke="#A4A7AE" width={18} height={18} />
          </div>
        </div>
        {/* Filters and Create Button */}
        <div className="mt-4 md:mt-0 flex gap-2 ">
          <Button className="bg-white text-black border border-gray-300 px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-gray-50">
            <ListFilter className="w-4 h-4" />
            Filters
          </Button>
          <Button className="bg-purple-600 text-white px-4 py-2 rounded-md text-sm flex items-center gap-2 hover:bg-purple-700">
            <Key className="w-4 h-4" />
            Generate new key
          </Button>
        </div>
      </div>
      {/* Header */}
      <div className="flex items-center  flex-wrap gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Api keys</h2>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full whitespace-nowrap">
          {mockKeys.length} Api keys
        </span>
      </div>
      {/* Table */}
      <div className="overflow-x-auto border rounded-md hide-scrollbar">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-50 border-b">
            <tr className="text-gray-500">
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
                <td className="px-4 py-3 flex items-center gap-2 max-w-xs text-gray-500">
                  <input
                    readOnly
                    type={showKeys[key.id] ? "text" : "password"}
                    value={key.key}
                    className="w-full bg-transparent border border-gray-200 p-3 rounded-md text-gray-500"
                  />
                  <Button onClick={() => toggleVisibility(key.id)}>
                    {showKeys[key.id] ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </Button>
                  <Button onClick={() => copyToClipboard(key.key)}>
                    <Copy className="w-4 h-4" />
                  </Button>
                </td>
                <td className="px-4 py-3 text-gray-500">{key.created}</td>
                <td className="px-4 py-3 text-gray-500">{key.lastUsed}</td>
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
                  <Button
                    onClick={() => toggleStatus(key.id)}
                    className={`text-sm px-3 py-1 rounded-md border ${
                      key.status === "Activated"
                        ? "text-red-600 border-red-600 hover:bg-red-50"
                        : "text-green-600 border-green-600 hover:bg-green-50"
                    }`}
                  >
                    {key.status === "Activated" ? "Revoke" : "Activate"}
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 overflow-x-auto hide-scrollbar">
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page: number) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
