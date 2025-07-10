// "use client";
// import { Check, Clock, CornerUpLeft, ArrowDown, ArrowUp } from "lucide-react";
// import Avatar from "../Avatar";
// import Pagination from "../Pagination"; // Import the pagination component
// import { useState } from "react";
// import transactions from "@/mockData/dashboardTableMockData";

// export default function TransactionTable() {
//   const [currentPage, setCurrentPage] = useState(1);
//   return (
//     <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
//       {/* Header */}
//       <div className="flex items-center gap-2 mb-4">
//         <h2 className="text-lg font-semibold text-gray-800">
//           Transaction History
//         </h2>
//         <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full">
//           {transactions.length} transactions
//         </span>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto hide-scrollbar">
//         <table className="min-w-full text-sm table-auto border border-gray-200">
//           <thead>
//             <tr className="text-left border-b text-gray-500 font-medium bg-gray-50 ">
//               <th className="p-2">
//                 <input type="checkbox" className="accent-gray-300" />
//               </th>
//               <th className="p-2">ID</th>
//               <th className="p-2">User</th>
//               <th className="p-2">Type</th>
//               <th className="p-2">Amount</th>
//               <th className="p-2">Status</th>
//               <th className="p-2">Date</th>
//               <th className="p-2">Action</th>
//             </tr>
//           </thead>

//           <tbody>
//             {transactions.map((transaction, i) => (
//               <tr key={i} className="border-b ">
//                 <td className="p-2">
//                   <input type="checkbox" className="accent-gray-300" />
//                 </td>
//                 <td className="p-2 text-gray-800 font-medium">
//                   {transaction.id}
//                 </td>
//                 <td className="p-2 flex items-center gap-2">
//                   <Avatar name={transaction.user} />
//                   <div>
//                     <div className="text-gray-800 font-medium">
//                       {transaction.user}
//                     </div>
//                     <div className="text-xs text-gray-500">
//                       {transaction.email}
//                     </div>
//                   </div>
//                 </td>
//                 <td className="p-2">
//                   <span
//                     className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
//                       transaction.type === "Credit"
//                         ? "bg-green-100 text-green-600"
//                         : "bg-red-100 text-red-600"
//                     }`}
//                   >
//                     {transaction.type === "Debit" && <ArrowDown size={14} />}
//                     {transaction.type === "Credit" && <ArrowUp size={14} />}
//                     {transaction.type}
//                   </span>
//                 </td>
//                 <td className="p-2">${transaction.amount.toFixed(2)}</td>
//                 <td className="p-2">
//                   <span
//                     className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
//                       transaction.status === "Completed"
//                         ? "bg-green-100 text-green-600"
//                         : transaction.status === "Pending"
//                         ? "bg-yellow-100 text-yellow-600"
//                         : "bg-gray-100 text-gray-600"
//                     }`}
//                   >
//                     {transaction.status === "Completed" && <Check size={14} />}
//                     {transaction.status === "Pending" && <Clock size={14} />}
//                     {transaction.status === "Refunded" && (
//                       <CornerUpLeft size={14} />
//                     )}
//                     {transaction.status}
//                   </span>
//                 </td>
//                 <td className="p-2 text-gray-600">{transaction.date}</td>
//                 <td className="p-2 text-gray-600 text-center">⋮</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-4 overflow-x-auto hide-scrollbar">
//         <Pagination
//           currentPage={currentPage}
//           totalPages={10}
//           onPageChange={(page) => setCurrentPage(page)}
//         />
//       </div>
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { Check, Clock, CornerUpLeft, ArrowDown, ArrowUp } from "lucide-react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";
import Spinner from "@/components/Spinner"; // ⬅️  your spinner

import {
  fetchTransactionsForTable,
  TableTransaction,
} from "@/lib/api/transactioncalls";

export default function TransactionsTable() {
  /* ---------------- state ---------------- */
  const [transactions, setTransactions] = useState<TableTransaction[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const limit = 8;

  /* ---------- load whenever page changes ---------- */
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchTransactionsForTable(currentPage, limit)
      .then(({ records, totalPages }) => {
        if (!mounted) return;
        setTransactions(records);
        setTotalPages(totalPages);
      })
      .finally(() => mounted && setLoading(false));

    return () => {
      mounted = false;
    };
  }, [currentPage]);

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
          <Spinner /> {/* use any size/props your Spinner supports */}
        </div>
      ) : (
        <>
          {/* Table */}
          <div className="overflow-x-auto hide-scrollbar">
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
                {transactions.map((tx, index) => (
                  <tr key={`${tx.id}-${index}`} className="border-b">
                    <td className="p-2">
                      <input type="checkbox" className="accent-gray-300" />
                    </td>
                    <td className="p-2 break-all font-medium">{tx.id}</td>
                    <td className="p-2 flex items-center gap-2">
                      <Avatar name={tx.user} />
                      <div>
                        <div className="font-medium text-gray-800">
                          {tx.user}
                        </div>
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
                        {tx.type === "Debit" && <ArrowDown size={14} />}
                        {tx.type === "Credit" && <ArrowUp size={14} />}
                        {tx.type}
                      </span>
                    </td>
                    <td className="p-2">{tx.description ?? "—"}</td>
                    <td className="p-2">${tx.amount.toLocaleString()}</td>
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
                        {tx.status === "Completed" && <Check size={14} />}
                        {tx.status === "Pending" && <Clock size={14} />}
                        {tx.status === "Refunded" && <CornerUpLeft size={14} />}
                        {tx.status}
                      </span>
                    </td>
                    <td className="p-2 text-gray-600">
                      {new Date(tx.date).toLocaleString()}
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
              onPageChange={(page) => {
                setCurrentPage(page);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
            />
          </div>
        </>
      )}
    </div>
  );
}
