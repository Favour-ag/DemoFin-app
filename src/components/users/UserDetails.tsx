"use client";

import { useState } from "react";
import { Wallet, CreditCard, BarChart3, X } from "lucide-react";

type Activity = {
  id: string;
  type: "Credit" | "Debit";
  description: string;
  date: string;
  amount: number;
};

type User = {
  name: string;
  email: string;
  walletBalance: string;
  transactions: number;
  transactionVolume: string;
};

type UserDetailsProps = {
  user: User;
  activities: Activity[];
  onClose?: () => void;
};

export default function UserDetails({
  user,
  activities,
  onClose,
}: UserDetailsProps) {
  return (
    <div className="w-full bg-white p-4 md:p-6 rounded-lg shadow-md">
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-col md:flex-row gap-2">
        <div>
          <h2 className="text-lg md:text-xl font-semibold">Account Summary</h2>
          <p className="text-sm text-gray-500">
            {user.name} ({user.email})
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="bg-purple-600 text-white text-sm px-3 py-2 rounded hover:bg-purple-700">
            Manage Wallet
          </button>
          <button className="border px-3 py-2 text-sm rounded hover:bg-gray-100">
            Reset Password
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        <SummaryCard
          title="Wallet Balance"
          value={user.walletBalance}
          icon={<Wallet className="w-5 h-5 text-purple-600" />}
        />
        <SummaryCard
          title="Transactions"
          value={`${user.transactions}`}
          icon={<CreditCard className="w-5 h-5 text-orange-500" />}
        />
        <SummaryCard
          title="Transaction Volume"
          value={user.transactionVolume}
          icon={<BarChart3 className="w-5 h-5 text-green-500" />}
        />
      </div>

      {/* Filters (optional placeholder for filters) */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3 mb-4">
        <input
          type="text"
          placeholder="Search transactions"
          className="w-full md:max-w-sm border px-4 py-2 rounded text-sm"
        />
        <div className="flex flex-wrap gap-2">
          <button className="border px-3 py-1 rounded text-xs">
            All time ✕
          </button>
          <button className="border px-3 py-1 rounded text-xs">US, AU ✕</button>
          <button className="border px-3 py-1 rounded text-xs">
            More filters
          </button>
        </div>
      </div>

      {/* Activity Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="text-xs text-gray-500 border-b">
            <tr>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Type</th>
              <th className="px-4 py-2">Description</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2 text-right">Amount</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((act) => (
              <tr key={act.id} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2 truncate">{act.id.slice(0, 12)}</td>
                <td className="px-4 py-2">
                  <span
                    className={`px-2 py-1 text-xs rounded-full font-medium ${
                      act.type === "Credit"
                        ? "bg-green-100 text-green-600"
                        : "bg-red-100 text-red-600"
                    }`}
                  >
                    {act.type}
                  </span>
                </td>
                <td className="px-4 py-2">{act.description}</td>
                <td className="px-4 py-2">{act.date}</td>
                <td className="px-4 py-2 text-right">
                  {act.type === "Credit" ? "+" : "-"}${act.amount.toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Placeholder */}
      <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
        <button className="px-3 py-2 border rounded hover:bg-gray-50">
          &larr; Previous
        </button>
        <div>Page 1 of 10</div>
        <button className="px-3 py-2 border rounded hover:bg-gray-50">
          Next &rarr;
        </button>
      </div>
    </div>
  );
}

function SummaryCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: React.ReactNode;
}) {
  return (
    <div className="border rounded-lg p-4 flex items-center justify-between gap-4 w-full">
      <div>
        <p className="text-sm text-gray-500">{title}</p>
        <h3 className="text-lg font-semibold">{value}</h3>
        <div className="text-green-500 text-xs mt-1">▲ 40% vs last month</div>
      </div>
      <div className="text-gray-400">{icon}</div>
    </div>
  );
}
