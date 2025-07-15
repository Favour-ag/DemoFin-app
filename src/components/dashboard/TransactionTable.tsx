"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Clock, ArrowDown, ArrowUp, XCircle } from "lucide-react";
import Avatar from "../Avatar";
import Button from "../Button";
import Pagination from "../Pagination";
import Spinner from "@/components/Spinner";
import { transactions } from "@/lib/api/transactioncalls";
import Link from "next/link";

export default function TransactionTable() {
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
                {paginatedTransactions.map((transaction) => (
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
                      {new Date(transaction.createdAt).toLocaleString()}
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
