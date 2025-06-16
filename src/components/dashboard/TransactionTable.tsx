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

const transactions = [
  {
    id: "#9590dffb-2c00-457c-8a7245",
    user: "Olivia Rhye",
    email: "olivia@untitledui.com",
    type: "Credit",
    amount: 144.55,
    status: "Completed",
    date: "Jan 6, 2025",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    user: "Phoenix Baker",
    email: "phoenix@untitledui.com",
    type: "Debit",
    amount: 144.55,
    status: "Completed",
    date: "Jan 6, 2025",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    user: "Demi Wilkinson",
    email: "demi@untitledui.com",
    type: "Debit",
    amount: 144.55,
    status: "Pending",
    date: "Jan 5, 2025",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    user: "Candice Wu",
    email: "candice@untitledui.com",
    type: "Credit",
    amount: 144.55,
    status: "Refunded",
    date: "Jan 5, 2025",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    user: "Olivia Rhye",
    email: "olivia@untitledui.com",
    type: "Credit",
    amount: 144.55,
    status: "Completed",
    date: "Jan 6, 2025",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    user: "Phoenix Baker",
    email: "phoenix@untitledui.com",
    type: "Debit",
    amount: 144.55,
    status: "Completed",
    date: "Jan 6, 2025",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    user: "Demi Wilkinson",
    email: "demi@untitledui.com",
    type: "Debit",
    amount: 144.55,
    status: "Pending",
    date: "Jan 5, 2025",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    user: "Candice Wu",
    email: "candice@untitledui.com",
    type: "Credit",
    amount: 144.55,
    status: "Refunded",
    date: "Jan 5, 2025",
  },
];

export default function TransactionTable() {
  const [currentPage, setCurrentPage] = useState(1);
  return (
    <div className="bg-white p-4 rounded-lg shadow-sm overflow-auto">
      {/* Title and View All */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Recent Transactions
        </h2>
        <button className="text-sm font-medium text-primary hover:underline">
          View all
        </button>
      </div>

      {/* Table */}
      <table className="min-w-full text-sm">
        <thead>
          <tr className="text-left border-b text-gray-500 font-medium bg-[#E9EAEB]">
            <th className="p-2">
              <input type="checkbox" className="accent-gray-300" />
            </th>
            <th className="p-2">ID</th>
            <th className="p-2">User</th>
            <th className="p-2">Type</th>
            <th className="p-2">Amount</th>
            <th className="p-2">Status</th>
            <th className="p-2">Date</th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((tx, i) => (
            <tr key={i} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <input type="checkbox" className="accent-gray-300" />
              </td>
              <td className="p-2 text-gray-800 font-medium">{tx.id}</td>
              <td className="p-2 flex items-center gap-2">
                <Avatar name={tx.user} />
                <div>
                  <div className="text-gray-800 font-medium">{tx.user}</div>
                  <div className="text-xs text-gray-500">{tx.email}</div>
                </div>
              </td>
              <td className="p-2">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                    tx.type === "Credit"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {tx.type === "Credit" && <ArrowDownCircle size={14} />}
                  {tx.type === "Debit" && <ArrowUpCircle size={14} />}
                  {tx.type}
                </span>
              </td>
              <td className="p-2">${tx.amount.toFixed(2)}</td>
              <td className="p-2">
                <span
                  className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                    tx.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : tx.status === "Pending"
                      ? "bg-yellow-100 text-yellow-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {tx.status === "Completed" && <CheckCircle size={14} />}
                  {tx.status === "Pending" && <Clock size={14} />}
                  {tx.status === "Refunded" && <RotateCcw size={14} />}
                  {tx.status}
                </span>
              </td>
              <td className="p-2 text-gray-600">{tx.date}</td>
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
