"use client";

import Pagination from "../Pagination";
import TransactionTable from "./TransactionsTable";
import { useState } from "react";

const transactions = [
  {
    id: "#9590dffb-2c00-457c-8a7245",
    type: "Credit",
    description: "Villa curia reprehenderit cubic...",
    amount: 144.55,
    status: "Completed",
    date: "Jan 6, 2025",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    type: "Debit",
    description: "Villa curia reprehenderit cubic...",
    amount: 144.55,
    status: "Pending",
    date: "Jan 5, 2025",
  },
  {
    id: "#9590dffb-2c00-457c-8a7245",
    type: "Debit",
    description: "Villa curia reprehenderit cubic...",
    amount: 144.55,
    status: "Refunded",
    date: "Jan 5, 2025",
  },
];

export default function TransactionsTab() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white  rounded-xl shadow-sm">
      {/* Filters */}
      <div className=" flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <input
          type="text"
          placeholder="Search transactions"
          className="border rounded-md px-3 py-2 w-full md:w-1/3"
        />
        <div className="flex gap-2 flex-wrap">
          <span className="text-sm bg-gray-100 px-2 py-1 rounded-md">
            All time ✕
          </span>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded-md">
            US, AU +4 ✕
          </span>
          <button className="text-sm text-purple-600 hover:underline">
            More filters
          </button>
        </div>
      </div>
      {/* Transaction History */}
      <div className="flex items-center justify-between flex-wrap gap-4 mt-4">
        <div className="flex items-center gap-2">
          <h2 className="text-lg font-semibold text-gray-900">
            Transaction History
          </h2>
          <span className="text-xs font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
            {transactions.length} Transactions
          </span>
        </div>
      </div>

      {/* Table */}
      <TransactionTable transactions={transactions} />

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
