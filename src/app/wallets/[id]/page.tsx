"use client";

import { useParams, useRouter } from "next/navigation";
import { mockWallets } from "../../../mockData/walletMockData";
import Image from "next/image";
import {
  ArrowLeft,
  ArrowRightLeft,
  TrendingDown,
  TrendingUp,
  CheckCircle,
  Clock,
  RotateCcw,
} from "lucide-react";
import clsx from "clsx";

const mockTransactions = [
  {
    id: "9590dffb-2c00-457c-8a7245",
    type: "Credit",
    description: "Villa curia reprehenderit cubicula...",
    amount: 144.55,
    status: "Completed",
    date: "Jan 6, 2025",
  },
  {
    id: "9590dffb-2c00-457c-8a7245",
    type: "Debit",
    description: "Villa curia reprehenderit cubicula...",
    amount: 144.55,
    status: "Pending",
    date: "Jan 5, 2025",
  },
  {
    id: "9590dffb-2c00-457c-8a7245",
    type: "Credit",
    description: "Villa curia reprehenderit cubicula...",
    amount: 144.55,
    status: "Refunded",
    date: "Jan 5, 2025",
  },
  // More...
];

export default function WalletDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const user = mockWallets.find((u) => u.id === id);

  if (!user) {
    return <div className="p-6 text-red-500">User not found.</div>;
  }

  const totalCredits = mockTransactions
    .filter((t) => t.type === "Credit")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalDebits = mockTransactions
    .filter((t) => t.type === "Debit")
    .reduce((sum, t) => sum + t.amount, 0);

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case "pending":
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case "refunded":
        return <RotateCcw className="w-4 h-4 text-blue-600" />;
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "text-green-600";
      case "pending":
        return "text-yellow-600";
      case "refunded":
        return "text-blue-600";
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-500 flex items-center gap-2">
        <button onClick={() => router.back()}>
          <ArrowLeft className="w-4 h-4" />
        </button>
        <span className="text-gray-700 font-medium">Go back</span>
        <span>/</span>
        <span className="text-gray-700 font-medium">Ademola</span>
        <span>/</span>
        <span className="text-black font-semibold">View User</span>
      </div>

      {/* Profile */}
      <div className="flex items-center gap-4">
        {user.image ? (
          <Image
            src={user.image}
            alt={user.name}
            width={48}
            height={48}
            className="rounded-full object-cover"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-purple-100 text-purple-600 flex items-center justify-center font-bold text-xl">
            {user.name.charAt(0)}
          </div>
        )}
        <div>
          <h2 className="text-xl font-semibold">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Wallet Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white border rounded-lg p-4 shadow">
          <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <span>Wallet Balance</span>
            <TrendingUp className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-2xl font-semibold">{user.balance}</div>
          <div className="text-sm text-green-600 mt-1">↑ 40% vs last month</div>
        </div>

        <div className="bg-white border rounded-lg p-4 shadow">
          <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <span>Total Credits</span>
            <ArrowRightLeft className="w-4 h-4 text-green-500" />
          </div>
          <div className="text-2xl font-semibold">
            ${totalCredits.toFixed(2)}
          </div>
          <div className="text-sm text-green-600 mt-1">↑ 40% vs last month</div>
        </div>

        <div className="bg-white border rounded-lg p-4 shadow">
          <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
            <span>Total Debits</span>
            <TrendingDown className="w-4 h-4 text-orange-500" />
          </div>
          <div className="text-2xl font-semibold">
            ${totalDebits.toFixed(2)}
          </div>
          <div className="text-sm text-green-600 mt-1">↑ 40% vs last month</div>
        </div>
      </div>

      {/* Transaction Table */}
      <div className="bg-white rounded-md shadow border">
        <div className="p-4 font-semibold border-b">Transaction History</div>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left bg-gray-50 border-b">
                <th className="px-4 py-3">ID</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Date</th>
              </tr>
            </thead>
            <tbody>
              {mockTransactions.map((tx, index) => (
                <tr key={index} className="border-b hover:bg-gray-50">
                  <td className="px-4 py-3 text-gray-800 text-sm">#{tx.id}</td>
                  <td className="px-4 py-3">
                    <span
                      className={clsx(
                        "inline-block px-2 py-1 text-xs font-medium rounded-full",
                        tx.type === "Credit"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      )}
                    >
                      {tx.type}
                    </span>
                  </td>
                  <td className="px-4 py-3 truncate max-w-xs">
                    {tx.description}
                  </td>
                  <td className="px-4 py-3 font-medium">
                    ${tx.amount.toFixed(2)}
                  </td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    {getStatusIcon(tx.status)}
                    <span
                      className={clsx(
                        "text-xs font-medium",
                        getStatusStyle(tx.status)
                      )}
                    >
                      {tx.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-sm">{tx.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
