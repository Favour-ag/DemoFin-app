// "use client";

// import { Check, Clock, CornerUpLeft, ArrowDown, ArrowUp } from "lucide-react";
// import Avatar from "../Avatar";
// import Pagination from "../Pagination";
// import transactions from "@/mockData/dashboardTableMockData";
// import Button from "../Button";
// import { usePagination } from "@/hooks/usePagination";

// export default function TransactionTable() {
//   const {
//     currentPage,
//     setCurrentPage,
//     totalPages,
//     paginatedData: paginatedTransactions,
//   } = usePagination(transactions, 8);

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-base sm:text-lg font-semibold text-gray-800">
//           Recent Transactions
//           <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full">
//             {transactions.length} transactions
//           </span>
//         </h2>
//         <Button className="text-sm font-medium text-primary hover:underline whitespace-nowrap">
//           View all
//         </Button>
//       </div>

//       {/* Table */}
//       <div className="overflow-x-auto hide-scrollbar">
//         <table className="min-w-full text-sm table-auto border border-gray-200">
//           <thead>
//             <tr className="text-left border-b text-gray-500 font-medium bg-[#E9EAEB]">
//               <th className="p-2 sm:p-3">
//                 <input type="checkbox" className="accent-gray-300" />
//               </th>
//               <th className="p-2 sm:p-3">
//                 <div className="flex items-center">
//                   ID <ArrowDown className="w-4 h-4 ml-1" />
//                 </div>
//               </th>
//               <th className="p-2 sm:p-3">User</th>
//               <th className="p-2 sm:p-3">Type</th>
//               <th className="p-2 sm:p-3">Amount</th>
//               <th className="p-2 sm:p-3">Status</th>
//               <th className="p-2 sm:p-3">Date</th>
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedTransactions.map((transaction, i) => (
//               <tr key={i} className="border-b hover:bg-gray-50">
//                 <td className="p-2 sm:p-3">
//                   <input type="checkbox" className="accent-gray-300" />
//                 </td>
//                 <td className="p-2 sm:p-3 text-gray-800 font-medium break-all">
//                   {transaction.id}
//                 </td>
//                 <td className="p-2 sm:p-3 flex items-center gap-2 sm:gap-4">
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
//                 <td className="p-2 sm:p-3">
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
//                 <td className="p-2 sm:p-3 text-gray-600">
//                   ${transaction.amount.toFixed(2)}
//                 </td>
//                 <td className="p-2 sm:p-3">
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
//                 <td className="p-2 sm:p-3 text-gray-600">{transaction.date}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* Pagination */}
//       <div className="mt-4">
//         <Pagination
//           currentPage={currentPage}
//           totalPages={totalPages}
//           onPageChange={(page) => {
//             setCurrentPage(page);
//             window.scrollTo({ top: 0, behavior: "smooth" });
//           }}
//         />
//       </div>
//     </div>
//   );
// }
// "use client";

// import { useEffect, useState } from "react";
// import { Check, Clock, CornerUpLeft, ArrowDown, ArrowUp } from "lucide-react";

// import Avatar from "../Avatar";
// import Button from "../Button";
// import Pagination from "../Pagination";
// import Spinner from "@/components/Spinner"; // ⬅️  your spinner

// import {
//   fetchRecentTransactions,
//   RawTransaction,
// } from "@/app/lib/api/transactioncalls";

// export default function TransactionTable() {
//   const [transactions, setTransactions] = useState<RawTransaction[]>([]);
//   const [loading, setLoading] = useState(true); // ⬅️  loading state
//   const [currentPage, setCurrentPage] = useState(1);
//   const limit = 16;

//   /* one‑time load – dashboard shows the latest 16 */
//   useEffect(() => {
//     let mounted = true;
//     fetchRecentTransactions(limit)
//       .then((data) => mounted && setTransactions(data))
//       .finally(() => mounted && setLoading(false));

//     return () => {
//       mounted = false;
//     };
//   }, []);

//   return (
//     <div className="bg-white p-4 rounded-lg shadow-md">
//       {/* Header */}
//       <div className="flex items-center justify-between mb-4">
//         <h2 className="text-base sm:text-lg font-semibold text-gray-800">
//           Recent Transactions
//           <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full ml-2">
//             {transactions.length}
//           </span>
//         </h2>
//         <Button className="text-sm font-medium text-primary hover:underline whitespace-nowrap">
//           View all
//         </Button>
//       </div>

//       {/* Spinner while fetching */}
//       {loading ? (
//         <div className="flex items-center justify-center py-20">
//           <Spinner />
//         </div>
//       ) : (
//         <>
//           {/* Table */}
//           <div className="overflow-x-auto hide-scrollbar">
//             <table className="min-w-full text-sm table-auto border border-gray-200">
//               <thead>
//                 <tr className="text-left border-b text-gray-500 font-medium bg-[#E9EAEB]">
//                   <th className="p-2 sm:p-3" />
//                   <th className="p-2 sm:p-3">ID</th>
//                   <th className="p-2 sm:p-3">User</th>
//                   <th className="p-2 sm:p-3">Type</th>
//                   <th className="p-2 sm:p-3">Amount</th>
//                   <th className="p-2 sm:p-3">Status</th>
//                   <th className="p-2 sm:p-3">Date</th>
//                 </tr>
//               </thead>

//               <tbody>
//                 {transactions.map((tx) => (
//                   <tr key={tx._id} className="border-b hover:bg-gray-50">
//                     <td className="p-2">
//                       <input type="checkbox" />
//                     </td>

//                     <td className="p-2 break-all">{tx.reference}</td>

//                     <td className="p-2 flex items-center gap-2">
//                       <Avatar
//                         name={`${tx.owner.firstname} ${tx.owner.lastname}`}
//                       />
//                       <div>
//                         <div className="font-medium">
//                           {tx.owner.firstname} {tx.owner.lastname}
//                         </div>
//                         <div className="text-xs text-gray-500">
//                           {tx.owner.email}
//                         </div>
//                       </div>
//                     </td>

//                     <td className="p-2">
//                       <span
//                         className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
//                           tx.direction === "credit"
//                             ? "bg-green-100 text-green-600"
//                             : "bg-red-100 text-red-600"
//                         }`}
//                       >
//                         {tx.direction === "debit" && <ArrowDown size={14} />}
//                         {tx.direction === "credit" && <ArrowUp size={14} />}
//                         {tx.type}
//                       </span>
//                     </td>

//                     <td className="p-2">
//                       {tx.sourceCurrency}{" "}
//                       {Number(
//                         tx.sourceAmount.replace(/,/g, "")
//                       ).toLocaleString()}
//                     </td>

//                     <td className="p-2">
//                       <span
//                         className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
//                           tx.status === "successful"
//                             ? "bg-green-100 text-green-600"
//                             : tx.status === "pending"
//                             ? "bg-yellow-100 text-yellow-600"
//                             : "bg-gray-100 text-gray-600"
//                         }`}
//                       >
//                         {tx.status === "successful" && <Check size={14} />}
//                         {tx.status === "pending" && <Clock size={14} />}
//                         {tx.status === "refunded" && <CornerUpLeft size={14} />}
//                         {tx.status}
//                       </span>
//                     </td>

//                     <td className="p-2 text-gray-600">
//                       {new Date(tx.createdAt).toLocaleString()}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* Dummy paginator so layout matches – only 1 page */}
//           <Pagination
//             currentPage={currentPage}
//             totalPages={1}
//             onPageChange={setCurrentPage}
//           />
//         </>
//       )}
//     </div>
//   );
// }
"use client";

import { useEffect, useState } from "react";
import { Check, Clock, CornerUpLeft, ArrowDown, ArrowUp } from "lucide-react";

import Avatar from "../Avatar";
import Button from "../Button";
import Pagination from "../Pagination";
import Spinner from "@/components/Spinner";

import {
  fetchRecentTransactions,
  RawTransaction,
} from "@/lib/api/transactioncalls";
import Link from "next/link";

export default function TransactionTable() {
  const [transactions, setTransactions] = useState<RawTransaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const limit = 8;

  /* fetch whenever the page changes */
  useEffect(() => {
    let mounted = true;
    setLoading(true);

    fetchRecentTransactions(currentPage, limit)
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

  return (
    <div className="bg-white rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 p-4">
        <h2 className="text-base sm:text-lg font-semibold text-gray-800">
          Recent Transactions
          <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full ml-2">
            {transactions.length}
          </span>
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
          <div className="overflow-x-auto hide-scrollbar">
            <table className="min-w-full text-sm table-auto border border-gray-200">
              <thead>
                <tr className="text-left border-b text-gray-500 font-medium bg-[#E9EAEB]">
                  <th className="p-2 sm:p-3" />
                  <th className="p-2 sm:p-3">ID</th>
                  <th className="p-2 sm:p-3">User</th>
                  <th className="p-2 sm:p-3">Type</th>
                  <th className="p-2 sm:p-3">Amount</th>
                  <th className="p-2 sm:p-3">Status</th>
                  <th className="p-2 sm:p-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx._id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <input type="checkbox" />
                    </td>

                    <td className="p-2 break-all">{tx.reference}</td>

                    <td className="p-2 flex items-center gap-2">
                      <Avatar
                        name={`${tx.owner.firstname} ${tx.owner.lastname}`}
                      />
                      <div>
                        <div className="font-medium">
                          {tx.owner.firstname} {tx.owner.lastname}
                        </div>
                        <div className="text-xs text-gray-500">
                          {tx.owner.email}
                        </div>
                      </div>
                    </td>

                    <td className="p-2">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
                          tx.direction === "credit"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {tx.direction === "debit" && <ArrowDown size={14} />}
                        {tx.direction === "credit" && <ArrowUp size={14} />}
                        {tx.type}
                      </span>
                    </td>

                    <td className="p-2">
                      {tx.sourceCurrency}{" "}
                      {Number(
                        tx.sourceAmount.replace(/,/g, "")
                      ).toLocaleString()}
                    </td>

                    <td className="p-2">
                      <span
                        className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                          tx.status === "successful"
                            ? "bg-green-100 text-green-600"
                            : tx.status === "pending"
                            ? "bg-yellow-100 text-yellow-600"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {tx.status === "successful" && <Check size={14} />}
                        {tx.status === "pending" && <Clock size={14} />}
                        {tx.status === "refunded" && <CornerUpLeft size={14} />}
                        {tx.status}
                      </span>
                    </td>

                    <td className="p-2 text-gray-600">
                      {new Date(tx.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination (with smooth‑scroll) */}
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
