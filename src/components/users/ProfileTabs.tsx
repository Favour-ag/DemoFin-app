"use client";

import { useState } from "react";
import OverviewTab from "./OverviewTab";
import TransactionsTab from "./TransactionsTab";

type Activity = {
  id: string;
  type: string;
  description: string;
  date: string;
  amount: number;
};

type ProfileTabsProps = {
  user: {
    name: string;
    email: string;
    walletBalance: string;
    transactions: number;
    transactionVolume: string;
  };
  activities: Activity[];
};

export default function ProfileTabs({ user, activities }: ProfileTabsProps) {
  const [tab, setTab] = useState("overview");

  const tabs = [
    { label: "Overview", value: "overview" },
    { label: "Transactions", value: "transactions" },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{user.name}</h2>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>

      <div className="flex gap-4 border-b mb-4">
        {tabs.map((t) => (
          <button
            key={t.value}
            onClick={() => setTab(t.value)}
            className={`py-2 px-4 text-sm ${
              tab === t.value
                ? "border-b-2 border-purple-600 font-medium"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "overview" && (
        <OverviewTab user={user} activities={activities} />
      )}
      {tab === "transactions" && <TransactionsTab />}
    </div>
  );
}
