// components/transactions/TransactionTable.tsx
"use client";

import { formatDateCustom } from "@/lib/utils";
import {
  ArrowUp,
  ArrowDown,
  CheckCircle,
  Clock,
  CornerUpLeft,
  Plus,
} from "lucide-react";

type Transaction = {
  id: string;
  type: string;
  description: string;
  amount: number;
  status: string;
  date: string;
};

type Props = {
  transactions: Transaction[];
  loading?: boolean;
};

export default function TransactionTable({ transactions, loading }: Props) {
  const renderStatusBadge = (status: string) => {
    switch (status) {
      case "successful":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-green-600 bg-green-50 px-2 py-1 rounded-full">
            <CheckCircle className="w-3.5 h-3.5" />
            {status}
          </span>
        );
      case "f":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
            <Clock className="w-3.5 h-3.5" />
            {status}
          </span>
        );
      case "failed":
        return (
          <span className="inline-flex items-center gap-1 text-xs font-medium text-red-600 bg-red-100 px-2 py-1 rounded-full">
            <Plus className="w-3.5 rotate-45 h-3.5" />

            {status}
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mt-4 overflow-auto rounded-lg border hide-scrollbar">
      <table className="min-w-full text-sm">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-4 py-2 text-left">
              <input type="checkbox" />
            </th>
            <th className="px-4 py-2 text-left text-gray-500 font-medium flex gap-1">
              ID
              <span>
                <ArrowDown className="w-4 h-5 " />
              </span>
            </th>
            <th className="px-4 py-2 text-left text-gray-500 font-medium">
              Type
            </th>
            <th className="px-4 py-2 text-left text-gray-500 font-medium">
              Description
            </th>
            <th className="px-4 py-2 text-left text-gray-500 font-medium min-w-[120px]">
              Source Amount
            </th>
            <th className="px-4 py-2 text-left text-gray-500 font-medium min-w-[200px]">
              Destination Amount
            </th>
            <th className="px-4 py-2 text-left text-gray-500 font-medium">
              Status
            </th>
            <th className="px-4 py-2 text-left text-gray-500 font-medium">
              Date
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                Loading transactions...
              </td>
            </tr>
          ) : transactions?.length === 0 ? (
            <tr>
              <td colSpan={7} className="px-4 py-6 text-center text-gray-500">
                No transactions found
              </td>
            </tr>
          ) : (
            transactions.map((txn: any, i: number) => (
              <tr key={i} className="border-t hover:bg-gray-50">
                <td className="px-4 py-3">
                  <input type="checkbox" />
                </td>
                <td className="px-4 py-3 font-medium text-gray-800">
                  {txn._id}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center text-xs font-medium px-2 py-1 rounded-full ${
                      txn.direction === "credit"
                        ? "text-green-600 bg-green-50"
                        : "text-red-600 bg-red-50"
                    }`}
                  >
                    {txn.direction === "credit" ? (
                      <ArrowUp className="w-3.5 h-3.5 mr-1" />
                    ) : (
                      <ArrowDown className="w-3.5 h-3.5 mr-1" />
                    )}
                    {txn.direction}
                  </span>
                </td>
                <td className="px-4 py-3 text-gray-700">{txn?.description}</td>
                <td className="px-4 py-3 text-gray-700 min-w-[200px]">
                  {txn?.sourceCurrency} {txn?.sourceAmount}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {txn?.destinationCurrency} {txn?.destinationAmount}
                </td>

                <td className="px-4 py-3">{renderStatusBadge(txn.status)}</td>
                {/* <td className="px-4 py-3 text-gray-500">{txn.createdAt}</td> */}
                <td className="px-4 py-3 text-gray-500 min-w-[200px]">
                  {" "}
                  <div>
                     <p>{formatDateCustom(new Date(txn.createdAt)).formattedDate}</p>
                     <p>{formatDateCustom(new Date(txn.createdAt)).formattedTime}</p>
                  </div>
                  {/* {formatDateCustom(new Date(txn.createdAt)).formattedDate} */}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
