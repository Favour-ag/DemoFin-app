"use client";

import { useMemo, useRef } from "react";
import { MoreVertical } from "lucide-react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";

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
  onPageChange: (page: number) => void;
  itemsPerPage?: number;
};

export default function AdminTable({
  admins,
  currentPage,
  onPageChange,
  itemsPerPage = 5,
}: AdminTableProps) {
  const tableRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(admins.length / itemsPerPage);

  const paginatedAdmins = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = currentPage * itemsPerPage;
    return admins.slice(start, end);
  }, [admins, currentPage, itemsPerPage]);

  const isNextDisabled = currentPage >= totalPages;

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-sm border border-gray-200"
      ref={tableRef}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Administrators</h2>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full">
          {admins.length} admins
        </span>
      </div>

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
            {paginatedAdmins.map((admin, i) => (
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
                <td className="p-3 text-gray-600">{admin.login}</td>
                <td className="p-3">
                  <MoreVertical className="text-gray-500 cursor-pointer" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 p-2">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
          scrollTargetRef={tableRef}
          isNextDisabled={isNextDisabled}
        />
      </div>
    </div>
  );
}
