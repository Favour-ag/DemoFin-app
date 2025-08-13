



"use client";

import { useRef, useState } from "react";
import {
  Check,
  Clock,
  CornerUpLeft,
  ShieldAlert,
} from "lucide-react";
import Avatar from "../Avatar";
import Pagination from "../Pagination";
import { approveTransfer, rejectTransfer } from "@/lib/api/transactioncalls";
import { formatDateCustom } from "@/lib/utils";
import Spinner from "../Spinner";

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
  totalPages: number;
  itemsPerPage: number;
  onPageChange: (page: number) => void;
  loading: boolean;
};

export default function TransfersTable({
  transfers,
  currentPage,
  onPageChange,
  totalPages,
  itemsPerPage,
  loading,
}: TransactionsTableProps) {
  const tableRef = useRef<HTMLDivElement>(null);


  // Track loading states for approve/reject per row
  const [loadingApprovals, setLoadingApprovals] = useState<Record<string, boolean>>({});
  const [loadingRejections, setLoadingRejections] = useState<Record<string, boolean>>({});

 

  const isNextDisabled =
    transfers.length < itemsPerPage || currentPage >= totalPages;

  const handleApproveTransfer = async (id: string) => {
    try {
      setLoadingApprovals(prev => ({ ...prev, [id]: true }));
      const res = await approveTransfer(id);
      console.log("Transfer approved:", res);
    } catch (error) {
      console.error("Error approving transfer:", error);
    } finally {
      setLoadingApprovals(prev => ({ ...prev, [id]: false }));
    }
  };

  const handleRejectTransfer = async (id: string) => {
    try {
      setLoadingRejections(prev => ({ ...prev, [id]: true }));
      const res = await rejectTransfer(id);
      console.log("Transfer rejected:", res);
    } catch (error) {
      console.error("Error rejecting transfer:", error);
    } finally {
      setLoadingRejections(prev => ({ ...prev, [id]: false }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-10">
        <Spinner />
      </div>
    );
  }

  if (!loading && transfers.length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <p className="text-gray-500">No transfers found</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex items-center gap-2 mb-4 p-4">
        <h2 className="text-lg font-semibold text-gray-800">
          Transfers History
        </h2>
        
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
              <th className="p-2">Amount</th>
              <th className="p-2">Status</th>
              <th className="p-2">Date</th>
              <th className="p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {transfers.map((tx, index) => (
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
                <td className="p-2">
                  {tx.currency} {Number(tx.amount.replace(/,/g, "")).toLocaleString()}
                </td>
                <td className="p-2">
                  <div className="flex flex-col gap-1">
                    <span
                      className={`inline-flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full ${
                        tx.status === "successful"
                          ? "bg-green-100 text-green-600"
                          : tx.status === "Pending"
                          ? "bg-yellow-100 text-yellow-600"
                          : "bg-red-100 text-red-600"
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
                 <div>
                  <p>{formatDateCustom(new Date(tx.createdAt)).formattedDate}</p>
                  <p>{formatDateCustom(new Date(tx.createdAt)).formattedTime}</p>
                 </div>
                </td>
                <td className="p-2 text-center text-gray-600">
                  <div className="flex items-center space-x-[10px] justify-center">
                    <button
                      onClick={() => handleApproveTransfer(tx._id)}
                      disabled={loadingApprovals[tx._id] || loadingRejections[tx._id]}
                      className={`bg-green-300 text-green-600 p-[5px] rounded disabled:opacity-50`}
                    >
                      {loadingApprovals[tx._id] ? "Approving..." : "Approve"}
                    </button>
                    <button
                      onClick={() => handleRejectTransfer(tx._id)}
                      disabled={loadingRejections[tx._id] || loadingApprovals[tx._id]}
                      className={`bg-red-300 text-red-600 p-[5px] rounded disabled:opacity-50`}
                    >
                      {loadingRejections[tx._id] ? "Rejecting..." : "Reject"}
                    </button>
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
          onPageChange={onPageChange}
          scrollTargetRef={tableRef}
          isNextDisabled={isNextDisabled}
        />
      </div>
    </div>
  );
}
