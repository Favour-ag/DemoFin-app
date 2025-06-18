"use client";
import {
  CheckCircle,
  Clock,
  RotateCcw,
  ArrowDownCircle,
  ArrowUpCircle,
  Share2,
} from "lucide-react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";
import { useState } from "react";
import Button from "../Button";

const data = [
  {
    id: "#9590dffb-2c00-457c-8a7245",
    admin: "Olivia Rhye",
    type: "User activate",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "9 months ago",
  },
  {
    id: "#d8a7c304-92f4-4912-9d44-678a72cb15bd",
    admin: "Phoenix Baker",
    type: "Settings update",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "2 weeks ago",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    admin: "Olivia Rhye",
    type: "Cancel Transaction",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "9 months ago",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    admin: "Olivia Rhye",
    type: "Admin Update",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "9 months ago",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    admin: "Olivia Rhye",
    type: "Wallet deduct",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "9 months ago",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    admin: "Olivia Rhye",
    type: "Create Transaction",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "9 months ago",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    admin: "Olivia Rhye",
    type: "Wallet Topup",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "9 months ago",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    admin: "Olivia Rhye",
    type: "User Suspend",
    description: "Villa curia reprehenderit cubi...",
    amount: "67.100.45.152",
    time: "9 months ago",
  },
];

export default function AuditLogs() {
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
            <th className="p-2">ID</th>
            <th className="p-2">Admin</th>
            <th className="p-2">Type</th>
            <th className="p-2">Description</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Time</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <input type="checkbox" className="accent-gray-300" />
              </td>
              <td className="p-2 whitespace-nowrap text-gray-700">{row.id}</td>
              <td className="p-2 whitespace-nowrap flex items-center gap-2">
                <Avatar name={row.admin} />
                <span className="text-gray-900 font-medium">{row.admin}</span>
              </td>
              <td className="p-2 whitespace-nowrap">
                <span
                  className={`text-sm font-medium ${
                    row.type.includes("Cancel")
                      ? "text-red-600"
                      : row.type.includes("User")
                      ? "text-purple-600"
                      : row.type.includes("Settings")
                      ? "text-indigo-600"
                      : row.type.includes("Wallet deduct")
                      ? "text-rose-600"
                      : "text-gray-700"
                  }`}
                >
                  {row.type}
                </span>
              </td>
              <td className="p-2 text-gray-600 whitespace-nowrap">
                {row.description}
              </td>
              <td className="p-2 whitespace-nowrap text-blue-700 underline cursor-pointer flex items-center gap-1">
                {row.amount}
                <Share2 className="w-4 h-4 text-blue-500 hover:text-blue-700" />
              </td>
              <td className="p-2 text-gray-500 whitespace-nowrap">
                {row.time}
              </td>
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
