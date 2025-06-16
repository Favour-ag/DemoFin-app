"use client";
import {
  CheckCircle,
  Clock,
  RotateCcw,
  ArrowDownCircle,
  ArrowUpCircle,
} from "lucide-react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";
import { useState } from "react";
import Button from "../Button";

const role = [
  {
    user: "Olivia Rhye",
    role: "Admin",
    status: "Active",
    login: "Jan 6, 2025",
    action: "",
  },
  {
    user: "Olivia Rhye",
    role: "Editor",
    status: "Inactive",
    login: "Jan 6, 2025",
    action: "",
  },
  {
    user: "Olivia Rhye",
    role: "Admin",
    status: "Active",
    login: "Jan 6, 2025",
    action: "",
  },
  {
    user: "Olivia Rhye",
    role: "Editor",
    status: "Inactive",
    login: "Jan 6, 2025",
    action: "",
  },
  {
    user: "Olivia Rhye",
    role: "Admin",
    status: "Active",
    login: "Jan 6, 2025",
    action: "",
  },
  {
    user: "Olivia Rhye",
    role: "Editor",
    status: "Inactive",
    login: "Jan 6, 2025",
    action: "",
  },
  {
    user: "Olivia Rhye",
    role: "Admin",
    status: "Active",
    login: "Jan 6, 2025",
    action: "",
  },
  {
    user: "Olivia Rhye",
    role: "Editor",
    status: "Inactive",
    login: "Jan 6, 2025",
    action: "",
  },
  {
    user: "Olivia Rhye",
    role: "Admin",
    status: "Active",
    login: "Jan 6, 2025",
    action: "",
  },
  {
    user: "Olivia Rhye",
    role: "Editor",
    status: "Inactive",
    login: "Jan 6, 2025",
    action: "",
  },
];

export default function TransactionTable() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm overflow-auto">
      {/* Title and View All */}
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Administrators</h2>
        <Button className="gap-2 border text-purple-700">
          <span>100 admins</span>
        </Button>

        {/* <button className="text-sm font-medium text-primary hover:underline">
          View all
        </button> */}
      </div>

      {/* Table */}
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b text-gray-500 font-medium">
            <th className="p-2">
              <input type="checkbox" className="accent-gray-300" />
            </th>
            <th className="p-2">Name</th>
            <th className="p-2">Role</th>
            <th className="p-2">Status</th>
            <th className="p-2">Last Login</th>
            <th className="p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {role.map((tx, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <input type="checkbox" className="accent-gray-300" />
              </td>

              <td className="p-2 flex items-center gap-2">
                <Avatar name={tx.user} />
                <div>
                  <div className="text-gray-800 font-medium">{tx.user}</div>
                  <div className="text-xs text-gray-500">{tx.role}</div>
                </div>
              </td>
              <td className="p-2 text-gray-800 font-medium">{tx.role}</td>

              <td className="p-2">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    tx.status === "Active"
                      ? "bg-green-100 text-green-600"
                      : tx.status === "Inactive"
                      ? "bg-gray-100 text-gray-600"
                      : ""
                  }`}
                >
                  {tx.status === "Active" && <CheckCircle size={14} />}

                  {tx.status === "Inactive" && <RotateCcw size={14} />}
                  {tx.status}
                </span>
              </td>
              <td className="p-2 text-gray-600">{tx.login}</td>
              <td className="p-2 text-gray-600">{tx.action}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
