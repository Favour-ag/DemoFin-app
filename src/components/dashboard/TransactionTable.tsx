"use client";

import { useState, useRef } from "react";
import {
  Check,
  Clock,
  ArrowDown,
  ArrowUp,
  XCircle,
  CircleDollarSign,
} from "lucide-react";
import Avatar from "../Avatar";
import Button from "../Button";
import Pagination from "../Pagination";
import Spinner from "@/components/Spinner";
import Link from "next/link";
import { formatDateCustom } from "@/lib/utils";

interface TransactionTableProps {
  transactions: any[];
  loading: boolean;
}

export default function TransactionTable({
  transactions,
  loading,
}: TransactionTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 10;

  // Pagination calculation
  const totalPages = Math.ceil(transactions.length / itemsPerPage);
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isNextDisabled =
    paginatedTransactions.length < itemsPerPage || currentPage >= totalPages;

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (!loading && transactions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-14 px-4 bg-white rounded-lg border border-gray-200">
        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-purple-50 mb-4">
          <CircleDollarSign className="h-8 w-8 text-purple-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-700">
          No transactions found
        </h3>
        <p className="text-sm text-gray-500 mt-1 max-w-sm text-center">
          Your recent transactions will appear here once they are made. Try
          adjusting filters or check back later.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between p-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Recent Transactions
        </h2>
        <Link href="/transactions">
          <Button className="text-sm font-medium text-primary hover:underline whitespace-nowrap">
            View all
          </Button>
        </Link>
      </div>

      {/* Spinner */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <Spinner />
        </div>
      ) : (
        <>
          {/* Table */}
          <div ref={tableRef} className="overflow-x-auto hide-scrollbar">
            <table className="min-w-full text-sm table-auto border border-gray-200">
              <thead>
                <tr className="text-left border-b text-gray-500 font-medium bg-[#E9EAEB] px-4">
                  <td className="p-2">
                    <input type="checkbox" />
                  </td>
                  <th className="p-2 sm:p-3">
                    <span className="flex items-center">
                      ID
                      <ArrowDown className="w-4 h-4 ml-1" />
                    </span>
                  </th>
                  <th className="p-2 sm:p-3">User</th>
                  <th className="p-2 sm:p-3">Type</th>
                  <th className="p-2 sm:p-3">Amount</th>
                  <th className="p-2 sm:p-3">Status</th>
                  <th className="p-2 sm:p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {paginatedTransactions.map((transaction: any) => (
                  <tr
                    key={transaction._id}
                    className="border-b hover:bg-gray-50"
                  >
                    <td className="p-2">
                      <input type="checkbox" />
                    </td>
                    <td className="p-2 break-all">{transaction._id}</td>
                    <td className="p-2 flex items-center gap-2">
                      <Avatar
                        name={`${transaction.owner.firstname} ${transaction.owner.lastname}`}
                      />
                      <div>
                        <div className="font-medium">
                          {transaction.owner.firstname}{" "}
                          {transaction.owner.lastname}
                        </div>
                        <div className="text-xs text-gray-500">
                          {transaction.owner.email}
                        </div>
                      </div>
                    </td>
                    <td className="p-2">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                          transaction.direction === "credit"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {transaction.direction === "debit" && (
                          <ArrowUp size={14} />
                        )}
                        {transaction.direction === "credit" && (
                          <ArrowDown size={14} />
                        )}
                        {transaction.type}
                      </span>
                    </td>
                    <td className="p-2">
                      {transaction.sourceCurrency}{" "}
                      {Number(
                        transaction.sourceAmount.replace(/,/g, "")
                      ).toLocaleString()}
                    </td>
                    <td className="p-2">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                          transaction.status === "successful"
                            ? "bg-green-100 text-green-600"
                            : transaction.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : transaction.status === "refunded"
                            ? "bg-gray-100 text-gray-600"
                            : transaction.status === "failed"
                            ? "bg-red-100 text-red-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        {transaction.status === "successful" && (
                          <Check size={14} />
                        )}
                        {transaction.status === "pending" && (
                          <Clock size={14} />
                        )}
                        {transaction.status === "refunded" && (
                          <span className="w-2 h-2 rounded-full bg-yellow-500 inline-block" />
                        )}
                        {transaction.status === "failed" && (
                          <XCircle size={14} />
                        )}

                        {transaction.status === "successful" && "Completed"}
                        {transaction.status === "pending" && "Pending"}
                        {transaction.status === "refunded" && "Refunded"}
                        {transaction.status === "failed" && "Failed"}
                        {!transaction.status && "..."}
                      </span>
                    </td>
                    <td className="p-2 text-gray-600">
                      <div>
                        <p>
                          {
                            formatDateCustom(new Date(transaction.createdAt))
                              .formattedDate
                          }
                        </p>
                        <p>
                          {
                            formatDateCustom(new Date(transaction.createdAt))
                              .formattedTime
                          }
                        </p>
                      </div>
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
              onPageChange={setCurrentPage}
              scrollTargetRef={tableRef}
              isNextDisabled={isNextDisabled}
            />
          </div>
        </>
      )}
    </div>
  );
}
