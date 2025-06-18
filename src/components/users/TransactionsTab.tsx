"use client";

import { CheckCircle, XCircle, MoreVertical } from "lucide-react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";
import { useState } from "react";

const transactions = [
  {
    id: "txn-001",
    name: "Savannah Nguyen",
    email: "Savana@gmail.com",
    type: "Credit",
    amount: 144.55,
    status: "Completed",
    date: "Jan 6, 2025",
  },
  {
    id: "txn-002",
    name: "Dianne Russell",
    email: "Diane@gmail.com",
    type: "Debit",
    amount: 89.99,
    status: "Failed",
    date: "Jan 6, 2025",
  },
  // ... more transactions
];

export default function TransactionsTab() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-800">Transactions</h2>
          <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
            {transactions.length} transactions
          </span>
        </div>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search transactions"
            className="border rounded-md px-3 py-1 text-sm w-64"
          />
          <button className="border rounded-md px-3 py-1 text-sm hover:bg-gray-50">
            Filter
          </button>
        </div>
      </div>

      <table className="min-w-full text-sm">
        {/* Table header and rows */}
      </table>

      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={5}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
