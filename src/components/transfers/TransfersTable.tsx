    // "use client";

    // import { useRef } from "react";
    // import { Check, Clock, CornerUpLeft, ArrowDown, ArrowUp } from "lucide-react";
    // import Avatar from "../Avatar";
    // import Pagination from "../Pagination";

    // type Transfer = {
    // _id: string;
    // owner: any;
    // type: string;
    // currency: string;
    // amount: string;
    // channel: string | null;
    // channelReference: string;
    // channelTxId: string | null;
    // isInternal: boolean;
    // reference: string;
    // recipient: {
    //     accountNumber: string;
    //     accountName: string;
    //     bankName: string;
    //     country: string;
    //     bankCode: string;
    //     accountType: string;
    // };
    // method: string;
    // narration: string;
    // status: string;
    // failureReason: string | null;
    // approvalStatus: string;
    // transactionId: string;
    // createdAt: string;
    // updatedAt: string;
    // };


    // type TransactionsTableProps = {
    // transfers: Transfer[]
    // currentPage: number;
    // onPageChange: (page: number) => void;
    // };

    // export default function TransfersTable({ 
    // transfers, 
    // currentPage, 
    // onPageChange 
    // }: TransactionsTableProps) {
    // const tableRef = useRef<HTMLDivElement>(null);

    // const itemsPerPage = 10;

    // // Pagination calculation
    // const totalPages = Math.ceil(transfers.length / itemsPerPage);
    // const paginatedTransactions = transfers.slice(
    //     (currentPage - 1) * itemsPerPage,
    //     currentPage * itemsPerPage
    // );

    // const isNextDisabled =
    //     paginatedTransactions.length < itemsPerPage || currentPage >= totalPages;

    // /* ---------------- render ---------------- */
    // return (
    //     <div className="bg-white rounded-lg shadow-sm border border-gray-200">
    //     {/* Header */}
    //     <div className="flex items-center gap-2 mb-4 p-4">
    //         <h2 className="text-lg font-semibold text-gray-800">
    //         Transfers History
    //         </h2>
    //         <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full">
    //         {transfers.length} transactions
    //         </span>
    //     </div>

    //     {/* Table */}
    //     <div ref={tableRef} className="overflow-x-auto hide-scrollbar">
    //         <table className="min-w-full text-sm table-auto border border-gray-200">
    //         <thead>
    //             <tr className="text-left border-b text-gray-500 font-medium bg-gray-50">
    //             <th className="p-2">
    //                 <input type="checkbox" className="accent-gray-300" />
    //             </th>
    //             <th className="p-2">ID</th>
    //             <th className="p-2">User</th>
    //             <th className="p-2">Type</th>
    //             <th className="p-2">Description</th>
    //             <th className="p-2">Amount</th>
    //             <th className="p-2">Status</th>
    //             <th className="p-2">Date</th>
    //             <th className="p-2">Action</th>
    //             </tr>
    //         </thead>

    //         <tbody>
    //             {paginatedTransactions.map((transaction: any, index: number) => (
    //             <tr key={`${transaction._id}-${index}`} className="border-b">
    //                 <td className="p-2">
    //                 <input type="checkbox" className="accent-gray-300" />
    //                 </td>
    //                 <td className="p-2 break-all font-medium">
    //                 {transaction._id}
    //                 </td>
    //                 <td className="p-2 flex items-center gap-2">
    //                 <Avatar
    //                     name={`${transaction.owner.firstname} ${transaction.owner.lastname}`}
    //                 />
    //                 <div>
    //                     <div className="font-medium">
    //                     {transaction.owner.firstname}{" "}
    //                     {transaction.owner.lastname}
    //                     </div>
    //                     <div className="text-xs text-gray-500">
    //                     {transaction.owner.email}
    //                     </div>
    //                 </div>
    //                 </td>
    //                 <td className="p-2">
    //                 <span
    //                     className={`inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full ${
    //                     transaction.direction === "credit"
    //                         ? "bg-green-100 text-green-600"
    //                         : "bg-red-100 text-red-600"
    //                     }`}
    //                 >
    //                     {transaction.direction === "debit" && (
    //                     <ArrowUp size={14} />
    //                     )}
    //                     {transaction.direction === "credit" && (
    //                     <ArrowDown size={14} />
    //                     )}
    //                     {transaction.type}
    //                 </span>
    //                 </td>
    //                 <td className="p-2">{transaction.description ?? "..."}</td>
    //                 <td className="p-2">
    //                 {transaction.sourceCurrency}{" "}
    //                 {Number(
    //                     transaction.sourceAmount.replace(/,/g, "")
    //                 ).toLocaleString()}
    //                 </td>
    //                 <td className="p-2">
    //                 <span
    //                     className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
    //                     transaction.status === "Completed"
    //                         ? "bg-green-100 text-green-600"
    //                         : transaction.status === "Pending"
    //                         ? "bg-yellow-100 text-yellow-600"
    //                         : "bg-gray-100 text-gray-600"
    //                     }`}
    //                 >
    //                     {transaction.status === "Completed" && (
    //                     <Check size={14} />
    //                     )}
    //                     {transaction.status === "Pending" && (
    //                     <Clock size={14} />
    //                     )}
    //                     {transaction.status === "Refunded" && (
    //                     <CornerUpLeft size={14} />
    //                     )}
    //                     {transaction.status}
    //                 </span>
    //                 </td>
    //                 <td className="p-2 text-gray-600">
    //                 {new Date(transaction.createdAt).toLocaleString()}
    //                 </td>
    //                 <td className="p-2 text-center text-gray-600">⋮</td>
    //             </tr>
    //             ))}
    //         </tbody>
    //         </table>
    //     </div>

    //     {/* Pagination */}
    //     <div className="mt-4 p-2">
    //         <Pagination
    //         currentPage={currentPage}
    //         totalPages={totalPages}
    //         onPageChange={onPageChange}
    //         scrollTargetRef={tableRef}
    //         isNextDisabled={isNextDisabled}
    //         />
    //     </div>
    //     </div>
    // );
    // }


    "use client";

import { useRef } from "react";
import { Check, Clock, CornerUpLeft, ArrowDown, ArrowUp, ShieldAlert } from "lucide-react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";

type Transfer = {
  _id: string;
  owner: any;
  type: string;
  currency: string;
  amount: string;
  channel: string | null;
  channelReference: string;
  channelTxId: string | null;
  isInternal: boolean;
  reference: string;
  recipient: {
    accountNumber: string;
    accountName: string;
    bankName: string;
    country: string;
    bankCode: string;
    accountType: string;
  };
  method: string;
  narration: string;
  status: string;
  failureReason: string | null;
  approvalStatus: string;
  transactionId: string;
  createdAt: string;
  updatedAt: string;
};

type TransactionsTableProps = {
  transfers: Transfer[];
  currentPage: number;
  onPageChange: (page: number) => void;
};

export default function TransfersTable({
  transfers,
  currentPage,
  onPageChange,
}: TransactionsTableProps) {
  const tableRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 10;
  const totalPages = Math.ceil(transfers.length / itemsPerPage);
  const paginated = transfers.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const isNextDisabled = paginated.length < itemsPerPage || currentPage >= totalPages;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 p-4">
        <h2 className="text-lg font-semibold text-gray-800">Transfers History</h2>
        <span className="bg-purple-100 text-purple-700 px-3 py-1 text-xs rounded-full">
          {transfers.length} transactions
        </span>
      </div>

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
            {paginated.map((tx, index) => (
              <tr key={`${tx._id}-${index}`} className="border-b">
                <td className="p-2">
                  <input type="checkbox" className="accent-gray-300" />
                </td>
                <td className="p-2 break-all font-medium">{tx._id}</td>
                <td className="p-2 flex items-center gap-2">
                  <Avatar
                    name={
                      tx.owner
                        ? `${tx.owner?.firstname ?? ""} ${tx.owner?.lastname ?? ""}`
                        : "Unknown User"
                    }
                  />
                  <div>
                    <div className="font-medium">
                      {tx.owner
                        ? `${tx.owner.firstname} ${tx.owner.lastname}`
                        : "Unknown User"}
                    </div>
                    <div className="text-xs text-gray-500">
                      {tx.owner?.email ?? "—"}
                    </div>
                  </div>
                </td>
                <td className="p-2">
                  <span className="inline-flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-full bg-blue-100 text-blue-600">
                    {tx.isInternal ? "Internal" : "External"} {tx.type}
                  </span>
                </td>
                <td className="p-2 text-gray-700">
                  {tx.narration || `${tx.recipient?.accountName ?? ""} @ ${tx.recipient?.bankName ?? ""}`}
                </td>
                <td className="p-2">
                  {tx.currency}{" "}
                  {Number(tx.amount.replace(/,/g, "")).toLocaleString()}
                </td>
                <td className="p-2">
                  <div className="flex flex-col gap-1">
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

                    {tx.approvalStatus !== "approved" && (
                      <span className="inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full bg-red-100 text-red-600">
                        <ShieldAlert size={14} />
                        Awaiting Approval
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-2 text-gray-600">
                  {new Date(tx.createdAt).toLocaleString()}
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

