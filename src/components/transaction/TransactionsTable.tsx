"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Clock, CornerUpLeft, ArrowDown, ArrowUp } from "lucide-react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";
import Spinner from "@/components/Spinner"; // ⬅️  your spinner

import { transactions } from "@/lib/api/transactioncalls";

export default function TransactionsTable() {
  const [transactionList, setTransactionList] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const tableRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 10;

  // Pagination calculation
  const totalPages = Math.ceil(transactionList.length / itemsPerPage);
  const paginatedTransactions = transactionList.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isNextDisabled =
    paginatedTransactions.length < itemsPerPage || currentPage >= totalPages;

  useEffect(() => {
    const getTransactionData = async () => {
      setLoading(true);
      try {
        const res = await transactions();
        const data = res?.data;

        const transactionArray = Array.isArray(data?.transactions)
          ? data.transactions
          : Array.isArray(data?.records)
          ? data.records
          : Array.isArray(data)
          ? data
          : [];

        setTransactionList(transactionArray);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      } finally {
        setLoading(false);
        // Scroll to the top of the table after data is loaded
        if (tableRef.current) {
          tableRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
        }
      }
    };

    getTransactionData();
  }, [currentPage]); // re-run when currentPage changes

  /* ---------------- render ---------------- */
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Transaction History
        </h2>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full">
          {transactions.length} transactions
        </span>
      </div>

      {/* Spinner while loading */}
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
                <tr className="text-left border-b text-gray-500 font-medium bg-gray-50">
                  <th className="p-2">
                    <input type="checkbox" className="accent-gray-300" />
                  </th>
                  <th className="p-2">ID</th>
                  <th className="p-2">User</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Description</th>
                  <th className="p-2">Amount</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Date</th>
                  <th className="p-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {paginatedTransactions.map((transaction, index) => (
                  <tr key={`${transaction._id}-${index}`} className="border-b">
                    <td className="p-2">
                      <input type="checkbox" className="accent-gray-300" />
                    </td>
                    <td className="p-2 break-all font-medium">
                      {transaction._id}
                    </td>
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
                    <td className="p-2">{transaction.description ?? "..."}</td>
                    <td className="p-2">
                      {transaction.sourceCurrency}{" "}
                      {Number(
                        transaction.sourceAmount.replace(/,/g, "")
                      ).toLocaleString()}
                    </td>
                    <td className="p-2">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                          transaction.status === "Completed"
                            ? "bg-green-100 text-green-600"
                            : transaction.status === "Pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {transaction.status === "Completed" && (
                          <Check size={14} />
                        )}
                        {transaction.status === "Pending" && (
                          <Clock size={14} />
                        )}
                        {transaction.status === "Refunded" && (
                          <CornerUpLeft size={14} />
                        )}
                        {transaction.status}
                      </span>
                    </td>
                    <td className="p-2 text-gray-600">
                      {new Date(transaction.createdAt).toLocaleString()}
                    </td>
                    <td className="p-2 text-center text-gray-600">⋮</td>
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
