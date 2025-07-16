"use client";
import { ArrowDown, ExternalLink } from "lucide-react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";
import Button from "../Button";

type AuditLog = {
  id: string;
  admin: string;
  type: string;
  description: string;
  amount: string;
  time: string;
};

type TransactionsTableProps = {
  auditLogs: AuditLog[];
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function TransactionsTable({ auditLogs, currentPage, onPageChange }: TransactionsTableProps) {
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      {/* Title and View All */}
      <div className="flex items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Activity Timeline
        </h2>
        <Button className="gap-2 border text-purple-700 ml-2">
          <span>{auditLogs.length} Activities</span>
        </Button>

        {/* <button className="text-sm font-medium text-primary hover:underline">
          View all
        </button> */}
      </div>

      {/* Table */}
      <div className="overflow-x-auto hide-scrollbar">
        <table className="min-w-full text-sm hide-scrollbar">
          <thead>
            <tr className="text-left border-b text-gray-500 font-medium">
              <th className="p-2">
                <input type="checkbox" className="accent-gray-300" />
              </th>
              <th className="p-2 flex">
                ID
                <span>
                  <ArrowDown className="w-4 h-5" />
                </span>
              </th>
              <th className="p-2">Admin</th>
              <th className="p-2">Type</th>
              <th className="p-2">Description</th>
              <th className="p-2">Amount</th>
              <th className="p-2">Time</th>
            </tr>
          </thead>
          <tbody>
            {auditLogs.map((row, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-2">
                  <input type="checkbox" className="accent-gray-300" />
                </td>
                <td className="p-2  text-gray-700">{row.id}</td>
                <td className="p-2  flex items-center gap-2">
                  <Avatar name={row.admin} />
                  <span className="text-gray-900 font-medium">{row.admin}</span>
                </td>
                <td className="p-2 ">
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
                <td className="p-2 text-gray-600 ">{row.description}</td>
                <td className="p-2  text-gray-500 cursor-pointer flex items-center gap-1">
                  {row.amount}
                  <ExternalLink className="w-4 h-4 text-gray-500" />
                </td>
                <td className="p-2 text-gray-500 ">{row.time}</td>
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
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
}
