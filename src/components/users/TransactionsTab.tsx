// "use client";

// import { CheckCircle, XCircle, MoreVertical } from "lucide-react";
// import Avatar from "../Avatar";
// import Pagination from "../Pagination";
// import { useState } from "react";

// const transactions = [
//   {
//     id: "txn-001",
//     name: "Savannah Nguyen",
//     email: "Savana@gmail.com",
//     type: "Credit",
//     amount: 144.55,
//     status: "Completed",
//     date: "Jan 6, 2025",
//   },
//   {
//     id: "txn-002",
//     name: "Dianne Russell",
//     email: "Diane@gmail.com",
//     type: "Debit",
//     amount: 89.99,
//     status: "Failed",
//     date: "Jan 6, 2025",
//   },
//   // ... more transactions
// ];

// export default function TransactionsTab() {
//   const [currentPage, setCurrentPage] = useState(1);

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
//       <div className="flex items-center justify-between mb-4">
//         <div className="flex items-center gap-2">
//           <h2 className="text-lg font-semibold text-gray-800">Transactions</h2>
//           <span className="text-sm font-medium text-purple-700 bg-purple-100 px-3 py-1 rounded-full">
//             {transactions.length} transactions
//           </span>
//         </div>
//         <div className="flex gap-2">
//           <input
//             type="text"
//             placeholder="Search transactions"
//             className="border rounded-md px-3 py-1 text-sm w-64"
//           />
//           <button className="border rounded-md px-3 py-1 text-sm hover:bg-gray-50">
//             Filter
//           </button>
//         </div>
//       </div>

//       <table className="min-w-full text-sm">
//         {/* Table header and rows */}
//       </table>

//       <div className="mt-4">
//         <Pagination
//           currentPage={currentPage}
//           totalPages={5}
//           onPageChange={(page) => setCurrentPage(page)}
//         />
//       </div>
//     </div>
//   );
// }"use client";

import { CheckCircle, XCircle, MoreVertical } from "lucide-react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";
import { useState } from "react";

const transactions = [
  {
    id: "#txn-001",
    name: "Savannah Nguyen",
    email: "Savana@gmail.com",
    type: "Credit",
    amount: 144.55,
    status: "Completed",
    date: "Jan 6, 2025",
  },
  {
    id: "#txn-002",
    name: "Dianne Russell",
    email: "Diane@gmail.com",
    type: "Debit",
    amount: 89.99,
    status: "Failed",
    date: "Jan 6, 2025",
  },
  // Add more if needed
];

export default function TransactionsTab() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="bg-white p-4 rounded-lg shadow-sm overflow-x-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
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
            className="border rounded-md px-3 py-2 text-sm w-64"
          />
          <button className="border rounded-md px-3 py-2 text-sm hover:bg-gray-50">
            Filter
          </button>
        </div>
      </div>

      {/* Table */}
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="text-left py-3 px-4 font-medium text-gray-500">
              ID
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">
              User
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">
              Type
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">
              Status
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">
              Date
            </th>
            <th className="text-left py-3 px-4 font-medium text-gray-500">
              Amount
            </th>
            <th className="text-right py-3 px-4 font-medium text-gray-500">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {transactions.map((txn) => (
            <tr key={txn.id} className="border-b hover:bg-gray-50">
              <td className="py-3 px-4 text-gray-800 font-medium">{txn.id}</td>
              <td className="py-3 px-4 flex items-center gap-3">
                <Avatar name={txn.name} />
                <div>
                  <p className="font-medium text-gray-700">{txn.name}</p>
                  <p className="text-xs text-gray-400">{txn.email}</p>
                </div>
              </td>
              <td className="py-3 px-4">
                <span
                  className={`text-xs font-medium px-2 py-1 rounded-full ${
                    txn.type === "Credit"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {txn.type}
                </span>
              </td>
              <td className="py-3 px-4">
                <span
                  className={`text-xs font-medium inline-flex items-center gap-1 px-2 py-1 rounded-full ${
                    txn.status === "Completed"
                      ? "bg-green-100 text-green-600"
                      : "bg-red-100 text-red-600"
                  }`}
                >
                  {txn.status === "Completed" ? (
                    <CheckCircle className="w-4 h-4" />
                  ) : (
                    <XCircle className="w-4 h-4" />
                  )}
                  {txn.status}
                </span>
              </td>
              <td className="py-3 px-4 text-gray-500">{txn.date}</td>
              <td
                className={`py-3 px-4 font-semibold ${
                  txn.type === "Credit" ? "text-green-600" : "text-red-600"
                }`}
              >
                {txn.type === "Credit" ? "+" : "-"}${txn.amount.toFixed(2)}
              </td>
              <td className="py-3 px-4 text-right">
                <button className="text-gray-400 hover:text-gray-600">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
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
