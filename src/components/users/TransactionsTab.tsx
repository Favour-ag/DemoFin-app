"use client";

import { useMemo, useRef, useState } from "react";
import TransactionTable from "./TransactionsTable";
import Pagination from "../Pagination";

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
  // Add more transactions here...
];

export default function TransactionsTab() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const tableRef = useRef<HTMLDivElement>(null);

  const totalPages = Math.ceil(transactions.length / itemsPerPage);

  const paginatedTransactions = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    return transactions.slice(start, end);
  }, [transactions, currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    if (tableRef.current) {
      tableRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className="bg-white rounded-xl shadow-sm">
      {/* Filters */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
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

      {/* Transaction History Header */}
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
      <div ref={tableRef} className="mt-4">
        <TransactionTable transactions={paginatedTransactions} />
      </div>

      {/* Pagination */}
      <div className="mt-6">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
          scrollTargetRef={tableRef}
          isNextDisabled={isNextDisabled}
        />
      </div>
    </div>
  );
}
