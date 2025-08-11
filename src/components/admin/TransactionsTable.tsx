"use client";

import { MoreVertical } from "lucide-react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";
import { formatDateCustom } from "@/lib/utils";

type Admin = {
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
  totalPages
}: AdminTableProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center  mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Administrators</h2>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full">
          {admins.length} admins
        </span>
      </div>
      {/* Table */}
      <div className="overflow-x-auto hide-scrollbar">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left border-b text-gray-500  bg-gray-50">
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
            {admins.map((admin, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-3">
                  <input type="checkbox" className="accent-gray-300" />
                </td>
                <td className="p-3 flex items-center gap-3 whitespace-nowrap">
                  <Avatar name={admin.name} />
                  <div>
                    <div className="text-gray-800 font-medium">
                      {admin.name}
                    </div>
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
                <td className="p-3 text-gray-600">{formatDateCustom(new Date(admin.login))}</td>
                <td className="p-3">
                  <MoreVertical className="text-gray-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-4 overflow-x-auto hide-scrollbar">
        <Pagination
          itemsPerPage={10}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
