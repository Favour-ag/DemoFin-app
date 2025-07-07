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

import { useState } from "react";
import { Check, Clock, CornerUpLeft, ArrowDown, ArrowUp } from "lucide-react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";
import { usePagination } from "@/hooks/usePagination";

// Define the transaction type
interface Transaction {
  id: string;
  user: string;
  email: string;
  type: "Credit" | "Debit";

  amount: number;
  status: "Completed" | "Pending" | "Refunded";
  date: string;
  description?: string;
}

interface TransactionsTableProps {
  transactions: Transaction[];
}

export default function TransactionsTable({
  transactions,
}: TransactionsTableProps) {
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    paginatedData: paginatedTransactions,
  } = usePagination(transactions, 8);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Transaction History
        </h2>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full">
          {transactions.length} transactions
        </span>
      </div>

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
            {paginatedTransactions.map((transaction, i) => (
              <tr key={i} className="border-b">
                <td className="p-2">
                  <input type="checkbox" className="accent-gray-300" />
                </td>
                <td className="p-2 text-gray-800 font-medium">
                  {transaction.id}
                </td>
                <td className="p-2 flex items-center gap-2">
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
                <td className="p-2">
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
                <td className="p-2">{transaction.description}</td>
                <td className="p-2">${transaction.amount.toFixed(2)}</td>
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
                    {transaction.status === "Completed" && <Check size={14} />}
                    {transaction.status === "Pending" && <Clock size={14} />}
                    {transaction.status === "Refunded" && (
                      <CornerUpLeft size={14} />
                    )}
                    {transaction.status}
                  </span>
                </td>
                <td className="p-2 text-gray-600">{transaction.date}</td>
                <td className="p-2 text-gray-600 text-center">⋮</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => {
            setCurrentPage(page);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
        />
      </div>
    </div>
  );
}
