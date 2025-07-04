"use client";
import { Check, Clock, CornerUpLeft, ArrowDown, ArrowUp } from "lucide-react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";
import { useState } from "react";
import transactions from "@/mockData/dashboardTableMockData";
import Button from "../Button";

export default function TransactionTable() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white p-4 sm:p-6 rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Recent Transactions
        </h2>
        <Button className="text-sm font-medium text-primary hover:underline whitespace-nowrap">
          View all
        </Button>
      </div>

      {/* Table Container */}
      <div className="overflow-x-auto hide-scrollbar">
        <table className="min-w-full text-sm table-auto border border-gray-200">
          <thead>
            <tr className="text-left border-b text-gray-500 font-medium bg-[#E9EAEB]">
              <th className="p-2 sm:p-3">
                <input type="checkbox" className="accent-gray-300" />
              </th>
              <th className="p-2 sm:p-3">
                <div className="flex items-center">
                  ID
                  <ArrowDown className="w-4 h-4 ml-1" />
                </div>
              </th>
              <th className="p-2 sm:p-3">User</th>
              <th className="p-2 sm:p-3">Type</th>
              <th className="p-2 sm:p-3">Amount</th>
              <th className="p-2 sm:p-3">Status</th>
              <th className="p-2 sm:p-3">Date</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, i) => (
              <tr key={i} className="border-b hover:bg-gray-50">
                <td className="p-2 sm:p-3">
                  <input type="checkbox" className="accent-gray-300" />
                </td>
                <td className="p-2 sm:p-3 text-gray-800 font-medium break-all">
                  {transaction.id}
                </td>
                <td className="p-2 sm:p-3 flex items-center gap-2 sm:gap-4">
                  <Avatar name={transaction.user} />
                  <div>
                    <div className="text-gray-800 font-medium">
                      {transaction.user}
                    </div>
                    <div className="text-xs text-gray-500">
                      {transaction.email}
                    </div>
                  </div>
                </td>
                <td className="p-2 sm:p-3">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                      transaction.type === "Credit"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {transaction.type === "Debit" && <ArrowDown size={14} />}
                    {transaction.type === "Credit" && <ArrowUp size={14} />}
                    {transaction.type}
                  </span>
                </td>
                <td className="p-2 sm:p-3 text-gray-600">
                  ${transaction.amount.toFixed(2)}
                </td>
                <td className="p-2 sm:p-3">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      transaction.status === "Completed"
                        ? "bg-green-100 text-green-600"
                        : transaction.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {transaction.status === "Completed" && <Check size={14} />}
                    {transaction.status === "Pending" && <Clock size={14} />}
                    {transaction.status === "Refunded" && (
                      <CornerUpLeft size={14} />
                    )}
                    {transaction.status}
                  </span>
                </td>
                <td className="p-2 sm:p-3 text-gray-600">{transaction.date}</td>
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
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </div>
  );
}
