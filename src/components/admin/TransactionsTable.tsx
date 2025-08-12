


"use client";

import { useState } from "react";
import { MoreVertical, Loader2 } from "lucide-react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";
import { formatDateCustom } from "@/lib/utils";
import { activateAdmin, deactivateAdmin } from "@/lib/api/usercalls";

type Admin = {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  login: string;
};

type AdminTableProps = {
  admins: Admin[];
  currentPage: number;
  itemsPerPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function AdminTable({
  admins,
  currentPage,
  onPageChange,
  itemsPerPage,
  totalPages,
}: AdminTableProps) {
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleActivateAdmin = async (adminId: string) => {
    setLoadingId(adminId);
    setError(null);
    try {
      const res = await activateAdmin(adminId);
      console.log(res);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to activate admin");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDeactivateAdmin = async (adminId: string) => {
    setLoadingId(adminId);
    setError(null);
    try {
      const res = await deactivateAdmin(adminId);
      console.log(res);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to deactivate admin");
    } finally {
      setLoadingId(null);
    }
  };

  console.log(admins, "admins");

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center mb-4 gap-2">
        <h2 className="text-lg font-semibold text-gray-800">Administrators</h2>
        
      </div>

      {error && (
        <div className="mb-4 text-sm text-red-600 bg-red-50 border border-red-200 rounded p-2">
          {error}
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto hide-scrollbar">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b text-gray-500 bg-gray-50">
              <th className="p-3">
                <input type="checkbox" className="accent-gray-300" />
              </th>
              <th className="p-3">Name</th>
              <th className="p-3">Role</th>
              <th className="p-3">Status</th>
              <th className="p-3">Last Login</th>
              <th className="p-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin) => (
              <tr key={admin._id} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <input type="checkbox" className="accent-gray-300" />
                </td>
                <td className="p-3 flex items-center gap-3 whitespace-nowrap">
                  <Avatar name={admin.name} />
                  <div>
                    <div className="text-gray-800 font-medium">{admin.name}</div>
                    <div className="text-xs text-gray-500">{admin.email}</div>
                  </div>
                </td>
                <td className="p-3">
                  <span
                    className={`inline-block text-xs font-medium px-2 py-1 rounded-full ${
                      admin.role === "Admin"
                        ? "bg-purple-100 text-purple-700"
                        : "bg-blue-100 text-blue-700"
                    }`}
                  >
                    {admin.role}
                  </span>
                </td>
                <td className="p-3">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      admin.status === "Active"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {admin.status}
                  </span>
                </td>
                <td className="p-3 text-gray-600">
                  {formatDateCustom(new Date(admin.login))}
                </td>
                <td className="p-3">
                  <div>
                    {loadingId === admin._id ? (
                    <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  ) : admin.status === "Active" ? (
                    <button
                      onClick={() => handleDeactivateAdmin(admin._id)}
                      className="text-xs px-3 py-1 bg-red-100 text-red-600 rounded hover:bg-red-200"
                    >
                      Deactivate
                    </button>
                  ) : (
                    <button
                      onClick={() => handleActivateAdmin(admin._id)}
                      className="text-xs px-3 py-1 bg-green-100 text-green-600 rounded hover:bg-green-200"
                    >
                      Activate
                    </button>
                  )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 overflow-x-auto hide-scrollbar">
        <Pagination
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
