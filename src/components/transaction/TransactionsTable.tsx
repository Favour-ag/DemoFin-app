"use client";

import { useRef } from "react";
// import { Check, Clock, CornerUpLeft, ArrowDown, ArrowUp } from "lucide-react";
// import Avatar from "../Avatar";
import Pagination from "../Pagination";
import { ArrowDown, ArrowUp, Check, Clock, CornerUpLeft } from "lucide-react";
import Avatar from "../Avatar";
import { formatDateCustom } from "@/lib/utils";

type Transaction = {
  _id: string;
  owner: {
    firstname: string;
    lastname: string;
    email: string;
  };
  direction: string;
  type: string;
  description?: string;
  sourceCurrency: string;
  sourceAmount: string;
  status: string;
  createdAt: string;
};

type TransactionsTableProps = {
  transactions: any
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function TransactionsTable({ 
  transactions, 
  currentPage, 
  onPageChange,
  totalPages
}: TransactionsTableProps) {
  const tableRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 10;

  // Pagination calculation
  
  const paginatedTransactions = transactions.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isNextDisabled =
    paginatedTransactions.length < itemsPerPage || currentPage >= totalPages;

    console.log(transactions, "transactions")

  /* ---------------- render ---------------- */
  return (
    <div className="bg-white rounded-lg shadow-sm border  w-full border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Transaction History
        </h2>
        {/* <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full">
          {transactions.length} transactions
        </span> */}
      </div>

      {/* Table */}
      

<div className="relative overflow-x-auto  sm:rounded-lg">
    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        {/* <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
                <th scope="col" className="p-4">
                    <div className="flex items-center">
                        <input id="checkbox-all-search" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                        <label htmlFor="checkbox-all-search" className="sr-only">checkbox</label>
                    </div>
                </th>
                <th scope="col" className="px-6 py-3">
                    Product name
                </th>
                <th scope="col" className="px-6 py-3">
                    Color
                </th>
                <th scope="col" className="px-6 py-3">
                    Category
                </th>
                <th scope="col" className="px-6 py-3">
                    Accessories
                </th>
                <th scope="col" className="px-6 py-3">
                    Available
                </th>
                <th scope="col" className="px-6 py-3">
                    Price
                </th>
                <th scope="col" className="px-6 py-3">
                    Weight
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
                <th scope="col" className="px-6 py-3">
                    Action
                </th>
            </tr>
        </thead> */}
         <thead>
            <tr className="text-left border-b text-gray-500 font-medium bg-gray-50">
              <th className="p-2">
                <input type="checkbox" className="accent-gray-300" />
              </th>
              <th className="p-2 min-w-[300px]">ID</th>
              <th className="p-2 min-w-[300px]">User</th>
              <th className="p-2">Type</th>
              <th className="p-2 min-w-[200px]">Source Transaction </th>
              <th className="p-2 min-w-[200px]">Destination Transaction</th>
              <th className="p-2 min-w-[200px]">Status</th>
              <th className="p-2 min-w-[200px]">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>
        <tbody>
           {paginatedTransactions.map((transaction: any, index: number) => (
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

            
                <td className="p-2 min-w-[200px]">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-semibold text-purple-500 bg-purple-200 px-2 py-1 rounded-full `}
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
                  {transaction.destinationCurrency}{" "}
                  {Number(
                    transaction.destinationAmount.replace(/,/g, "")
                  ).toLocaleString()}
                </td>
                
                <td className="p-2">
                  <span
                    className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                      transaction.status === "successful"
                        ? "bg-green-100 text-green-600"
                        : transaction.status === "Pending"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-red-100 text-red-600"
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
                  {formatDateCustom(new Date(transaction.createdAt))}
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
          onPageChange={onPageChange}
          scrollTargetRef={tableRef}
          isNextDisabled={isNextDisabled}
        />
      </div>
    </div>
  );
}
